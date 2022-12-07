import env from '../Config/env'

const menu = async (slug: string) => {
    const url = env.api + '/menu/' + slug
    const res = await fetch(url, {
        method: 'GET'
    })

    return res.json()
}

/**
 * Send a mail to the admin, with the specified parameters
 * @param param Params are in an object:
 *      - name: the name of the user
 *      - address: the E-Mail address of the user
 *      - content: the message that the user has written
 * @returns {Promise}
 */
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

/**
 * Retrive initial website data
 * @returns {Promise}
 */
const loadSite = async () => {
    const url = env.api + '/loadSite'
    const res = await fetch(url, {
        method: 'GET'
    })
    
    return res.json()
}

export {
    menu,
    sendMail,
    loadSite
}