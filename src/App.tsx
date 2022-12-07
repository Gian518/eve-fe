import React, { useState, useEffect, useGlobal } from 'reactn'
import './App.css'

// Third-party components
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

// Custom components
import Screen from './Components/Screen'

// Libraries
import i18next from 'i18next'
import { initReactI18next, useTranslation } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import API from './API'
import env from './Config/env'
import it from './Languages/it.json'
import en from './Languages/en.json'

// Screens
import Root from './Components/Root'
import NotFound from './Screens/NotFound'

i18next
	.use(LanguageDetector)
	.use(initReactI18next)
	.init({
		debug: env.debug,
		fallbackLng: 'en',
		resources: {
			it: {
				translation: it
			},
			en: {
				translation: en
			}
		}
	})

const App = () => {

	/**** GLOBAL STATE ****/
	const [language, setLanguage] = useGlobal<any>('language')
	const [colorScheme, setColorScheme] = useGlobal<any>('colorScheme')
	const [authorName, setAuthorName] = useGlobal<any>('authorName')
	const [authorMail, setAuthorMail] = useGlobal<any>('authorMail')
	const [social, setSocial] = useGlobal<any>('social')

	/**** STATE VARIABLES ****/
	const [router, setRouter] = useState<any>()
	const [loaded, setLoaded] = useState<boolean>(false)

	/**** HOOKS ****/
	const { t } = useTranslation()

	/**** BOOT ****/
	useEffect(() => {
		// Load the user language
		loadLanguage()

		// Check for user color scheme and then add the listener
		if(window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches){
			setColorScheme('dark')
		} else {
			setColorScheme('light')
		}

		window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', event => {
			const scheme = event.matches ? "dark" : "light"
			setColorScheme(scheme)
		})
	}, [])

	/**
	 * Reload data when language change
	 */
	useEffect(() => {
		if(language){
			loadData()
		} else {
			loadLanguage()
		}
	}, [language])

	/**
	 * Load language from browser
	 */
	const loadLanguage = () => {
		if(i18next.language){
			setLanguage(i18next.language.substring(0, 2))
		}
	}

	/**
	 * Load data from backend
	 */
	const loadData = async () => {
        try {
			const init = await API.General.loadSite()
			console.log("INIT data:", init)
			if(init){
				setAuthorName(init.author_name)
				setAuthorMail(init.author_mail)
				setSocial(init.social)
			} else {
				throw init
			}
			
            const data = await API.General.menu('main-' + language)
            console.log("Menu APIs data:", data)
            if(data){
				// Configuring pages for main router.
				let menuItems: any[] = []
				let urls = data.map((item: any) => {
					/**
					 * These instructions are built to extract the slug from the URL.
					 * Note: You cannot transform the item.title into a slug, since the user can manually change the slug in the WP backoffice
					 * HOW IT WORKS?
					 * 1. Remove the base domain from the URL, starting from the string stored in the env file
					 * 2. You should have an array of supported languages in your env file. If it exists, cycle it
					 * 3. Every iteration remove a possible Polylang string particle from the URL. Note that we're removing lang + '/' (which is, for example: "en/")
					 * 4. You should now have a clean slug, which we're using for getting pages from APIs
					 */
					let cleanUrl = item.url.replace(env.domain, '')
					if(env.languages){
						env.languages.forEach(lang => {
							cleanUrl = cleanUrl.replace(lang + '/', '')
						})
					}

					// Saving key for menu by removing everything for homepages and by removing / for other pages
					if(cleanUrl.includes('homepage-')){
						cleanUrl = '/'
						item.key = ''
					} else {
						item.key = cleanUrl.replaceAll('/', '')
					}
					menuItems.push(item)

					return {
						path: cleanUrl,
						element: <Screen/>,
						errorElement: <NotFound/>
					}
				})

				// This ":anything" is used for pages which aren't listed in main menu. See Screen.tsx for details
				urls.push({
					path: ':anything',
					element: <Screen/>,
					errorElement: <NotFound/>
				})

				// Configuring router
				const rtr = createBrowserRouter([
					{
						path: '/',
						element: <Root items={menuItems}/>,
						errorElement: <NotFound/>,
						children: urls,
					},
				])
				setRouter(rtr)

				// Page is loaded
                setLoaded(true)
            } else {
                throw data
            }
        } catch (error) {
            console.log("Error in App.loadData:", error)
            alert(t('verificatoErrore'))
        }
    }

	
	return(
		loaded
		?
		<>
			<RouterProvider router={router} />
		</>
		:
		null
	)

	
}

export default App