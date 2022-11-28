const domain = "http://localhost:8888/eve-cms"

export default {
    domain,
    authorName: 'Evelyn Iuliano',
    authorMail: 'info@evelyniuliano.com',
    api: domain + "/wp-json/wp/v2",
    auth: domain + "jwt-auth/v1",
    debug: true,
    languages: ['it', 'en']
}