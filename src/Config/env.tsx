const domain = "http://localhost:8888/eve-cms"

export default {
    domain,
    api: domain + "/wp-json/wp/v2",
    auth: domain + "jwt-auth/v1",
    debug: true,
    languages: ['it', 'en']
}