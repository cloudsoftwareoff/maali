import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import enTranslation from './en.json';
import frTranslation from './fr.json';
import arTranslation from './ar.json'
const resources = {
  en: {
    translation: enTranslation,
  },
  fr: {
    translation: frTranslation,
  },
  ar:{
    translation:arTranslation
  }
};
//  user primary language
const userLanguage = navigator.language.split('-')[0]; 

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: userLanguage || 'en', 
    interpolation: {
      escapeValue: false, 
    },
  });

export default i18n;
