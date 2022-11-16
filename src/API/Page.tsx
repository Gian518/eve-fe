import env from '../Config/env'

const pages = async (slug: string) => {
    const url = env.api + '/pages?slug=' + slug
    const res = await fetch(url, {
        method: 'GET',
    })

    return res.json()
}

const getPage = async (slug: string) => {
    const url = env.api +'/getPage/' + slug
    const res = await fetch(url, {
        method: 'GET'
    })

    return res.json()
}

export {
    pages,
    getPage
}