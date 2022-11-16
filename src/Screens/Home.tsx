import React, { useEffect, useState, useGlobal } from 'reactn'

// Libraries
import API from '../API'

type HomeType = {
    ID: number,
    featured: string,
    postTitle: string,
    postContent: string,
}

const Home = ({
    ID,
    featured,
    postTitle,
    postContent
}: HomeType) => {

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

export default Home