import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import resources from './resources';

const i18nInit = (language) => {
  i18n.use(initReactI18next).init({
    // default language
    lng: (language && language.toLocaleLowerCase()) || 'en',

    // we init with resources
    resources,

    // You may need to polyfill the Intl.PluralRules API, in case it is not available it will fallback to the i18next JSON format v3 plural handling.
    compatibilityJSON: 'v3',

    // to log warning and errors in dev mode
    // debug: true,

    //language to use if translations in user language are not available
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false, // not needed for react!!
    },
    ns: ['translation'],
    defaultNS: 'translation',
  });
};

export default i18nInit;
