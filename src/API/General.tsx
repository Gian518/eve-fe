import env from '../Config/env'

const menu = async (slug: string) => {
    const url = env.api + '/menu/' + slug
    const res = await fetch(url, {
        method: 'GET'
    })

    return res.json()
}

const sendMail = async ({
    name,
    address,
    content
}: {
    name: string,
    address: string,
    content: string
}) => {
    const url = env.api + '/sendMail'
    const body = {
        name,
        address,
        content
    }
    const res = await fetch(url, {
        method: 'POST',
        headers: {
            accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    })

    return res.json()
}

export {
    menu,
    sendMail
}