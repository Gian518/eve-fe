import React, { useEffect, useState, useGlobal } from 'reactn'

// Libraries
import API from '../API'

type PageType = {
    ID: number,
    featured: string,
    postTitle: string,
    postContent: string,
}

const Page = ({
    ID,
    featured,
    postTitle,
    postContent
}: PageType) => {

    /**** STATE VARIABLES ****/
	const [posts, setPosts] = useState<any[]>([])

	/**** BOOT ****/
	useEffect(() => {
		
	}, [])

    return (
		<div>
			{
				posts.length == 0
				?
				'Waiting'
				:
				<div dangerouslySetInnerHTML={{ __html: posts[0].content.rendered.toString() }}/>
			}
		</div>
	)

}

export default Page