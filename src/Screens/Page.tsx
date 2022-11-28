import React, { useEffect, useState, useGlobal } from 'reactn'

// Libraries
import API from '../API'

type PageType = {
    ID: number,
    featured: string,
    postTitle: string,
    postContent: string,
    meta: any
}

const Page = ({
    ID,
    featured,
    postTitle,
    postContent,
    meta
}: PageType) => {

    /**** STATE VARIABLES ****/
	const [posts, setPosts] = useState<any[]>([])

	/**** BOOT ****/
	useEffect(() => {
		
	}, [])

    return (
		<div>
			<div dangerouslySetInnerHTML={{ __html: postContent }}/>
		</div>
	)

}

export default Page