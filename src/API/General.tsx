import env from '../Config/env'

const menu = async (slug: string) => {
    const url = env.api + '/menu/' + slug
    const res = await fetch(url, {
        method: 'GET'
    })

    return res.json()
}

export {
    menu
}