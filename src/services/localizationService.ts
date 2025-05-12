import { messages } from '../locales'

export const getMessage = (key: keyof typeof messages['en'], lang: 'en' | 'sk' = 'en') => {
    return messages[lang][key] || messages['en'][key] || key
}
