import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';

// Импорт ресурсов для локализации
import translationEN from '../locales/en.json';
import translationKK from '../locales/kk.json';
import translationRU from '../locales/ru.json';

// Языковые ресурсы
const resources = {
    en: {
        translation: translationEN
    },
    ru: {
        translation: translationRU
    },
    kk: {
        translation: translationKK
    }
};

i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        resources,
        fallbackLng: 'ru',

        interpolation: {
            escapeValue: false, // не экранировать html
        },

        detection: {
            order: ['localStorage', 'navigator'],
            caches: ['localStorage'],
        },
    });

export default i18n;