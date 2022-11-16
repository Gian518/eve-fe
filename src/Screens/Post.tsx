import React, { useEffect, useState, useGlobal } from 'reactn'

// Libraries
import API from '../API'

const Post = () => {

    /**** STATE VARIABLES ****/
	const [posts, setPosts] = useState<any[]>([])

	/**** BOOT ****/
	useEffect(() => {
		getPosts()
	}, [])

	const getPosts = async () => {
		try {
			const data = await API.Post.posts()
			setPosts(data)
		} catch (error) {
			console.log('Error in getPosts:', error)
			alert('Si è verificato un errore')
		}
	}

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

export default Post