import env from '../Config/env'

const posts = async () => {
    const url = env.api + '/posts'
    const res = await fetch(url, {
        method: 'GET',
        // headers: {

        // }
    })

    return res.json()
}

export {
    posts
}