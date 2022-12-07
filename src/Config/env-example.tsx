/**
 * This file is used as an env-ish collection of values.
 * Do NOT use it for storing sensible data (passwords, api keys, etc.) Since this file is VISIBLE to everyone who can do "Inspect element" in a browser.
 * Note that the final env.tsx file is included in .gitingore, since it's an env file.
 */

const domain = "https://example.com"

export default {
    domain, // The main website domain
    authorName: 'John Doe', // The artist/owner name. This is used just as a fallback value when an error occurs
    authorMail: 'web@example.com', // The artist/owner mail. Currently not used and thought just as fallback
    api: domain + "/api/rest", // URL used for APIs. Note that it's combined with domain for pratical purpose, you can obviously change it as necessary.
    auth: domain + "/auth/rest", // URL used for authentication. Currently not used.
    debug: true, // Define if the environment is debug safe (development) or not (production)
    languages: ['it', 'en'] // Currently supported languages. Please, use ISO 639-1 codes (if possible) in order to define your languages. See: https://en.wikipedia.org/wiki/List_of_ISO_639-1_codes
}