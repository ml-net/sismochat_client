import { createI18n } from 'vue-i18n'
import en from './locales/en.json'
import it from './locales/it.json'

const browserLocale =
  typeof navigator !== 'undefined' && typeof navigator.language === 'string'
    ? navigator.language
    : 'en'

const i18n = createI18n({
  legacy: false,
  locale: browserLocale.startsWith('it') ? 'it' : 'en',
  fallbackLocale: 'en',
  messages: { en, it }
})

export default i18n
