'use strict'

const i18next = require('i18next')
const Backend = require('i18next-sync-fs-backend')

// i18n config
i18next
  .use(Backend)
  .init({
    fallbackLng: [ 'en' ],
    ns: [ 'errors' ],
    load: 'languageOnly',
    backend: {
      loadPath: './locales/{{ lng }}/{{ ns }}.json'
    }
  }, (error) => {
    if (error) console.log(error)
  })

module.exports = i18next
