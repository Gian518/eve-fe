import env from '../Config/env'

const token = async (username: string, password: string) => {
    const url = env.auth + '/token'
    const body = new FormData()
    body.append('username', username)
    body.append('password', password)
    const res = await fetch(url, {
        method: 'POST',
        body
    })

    return res.json()
}

export {
    token
}