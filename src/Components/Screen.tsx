import React, { useEffect, useState, useGlobal } from 'reactn'

// Libraries
import { useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import API from '../API'

// Screens
import NotFound from '../Screens/NotFound'
import Page from '../Screens/Page'
import Home from '../Screens/Home'
import Biography from '../Screens/Biography'
import Gallery from '../Screens/Gallery'
import Contacts from '../Screens/Contacts'
import env from '../Config/env'

/**
 * ** SCREEN **
 * This is the "wrapper" component of every page and post. It loads data and renders the requested page.
 * HOW IT WORKS?
 * 1. At boot, the component call the "getPage" function to download data. Note that this useEffect is a bit hybrid, since it's used for boot and every time the location change
 * 2. The "getPage" function, using APIs, downloads the page from WP and saves it in the "page" state
 * 3. If APIs returns an empty array, the function throws an error and then show the NotFound component (see NotFound.tsx for details)
 * @returns {React.Component}
 */
const Screen = () => {

	/**** GLOBAL STATE ****/
	const [language, setLanguage] = useGlobal<any>('language')
	const [authorName, setAuthorName] = useGlobal<any>('authorName')

    /**** STATE VARIABLES ****/
    const [page, setPage] = useState<any>(null)
	const [status, setStatus] = useState<null|'loaded'|'not-found'>(null)

	/**** HOOKS ****/
	const location = useLocation()
	const { t } = useTranslation()

	/**** BOOT ****/
	useEffect(() => {
		getPage()
	}, [location])
	
	/**
	 * Download page from backend
	 */
    const getPage = async () => {
		try {
			// If pathname is empty, it means that I'm in the homepage. So, I have to load the right homepage following the current language
			let path = location.pathname.replace('/', '')
			let isHome = false
			if(path.length == 0){
				path = 'homepage-' + language
				isHome = true
			}

            const data = await API.Page.getPage(path)
			if(!data){
				throw new Error('Page not found')
			}
            console.log("Passing path: " + path + ", responded with:", data)

			// Setting current page
            setPage(data)

			// Setting page title
			if(isHome){
				document.title = authorName
			} else {
				document.title = authorName + ' - ' + data.post_title
			}

			setStatus('loaded')
        } catch (err) {
            console.log("Error in Screen.getPage:", err)
			document.title = env.authorName
			setStatus('not-found')
        }
    }

    return (
		<div>
			{
				status == null
				?
				t('attendere')
				: status == 'loaded' ?
				(
					// Default page template
					page.template == 'page' ?
					<Page
						ID={page.ID}
						postTitle={page.post_title}
						postContent={page.post_content}
						featured={page.featured}
						meta={page.meta}
					/>

					// "Homepage" template
					: page.template == 'homepage.php' ?
					<Home
						ID={page.ID}
						postTitle={page.post_title}
						postContent={page.post_content}
						featured={page.featured}
						meta={page.meta}
					/>

					// "Biography" template
					: page.template == 'biography.php' ?
					<Biography
						ID={page.ID}
						postTitle={page.post_title}
						postContent={page.post_content}
						featured={page.featured}
						meta={page.meta}
					/>

					// "Gallery" template
					: page.template == 'gallery.php' ?
					<Gallery
						ID={page.ID}
						postTitle={page.post_title}
						postContent={page.post_content}
						featured={page.featured}
						meta={page.meta}
					/>

					// "Contacts" template
					: page.template == 'contacts.php' ?
					<Contacts
						ID={page.ID}
						postTitle={page.post_title}
						postContent={page.post_content}
						featured={page.featured}
						meta={page.meta}
					/>

					// Nothing happens
					: null
				)
				: status == 'not-found' ?
				<NotFound/>
				:
				null
			}
		</div>
	)

}
 
export default Screen