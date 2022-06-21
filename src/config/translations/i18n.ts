import i18n, { I18nFormatModule } from 'i18next';
import { initReactI18next } from 'react-i18next';
import * as RNLocalize from 'react-native-localize';

import ar from './ar';
import en from './en';
import pl from './pl';

const languageDetector = {
  type: 'languageDetector',
  async: false,
  detect: () => RNLocalize.getLocales()[0].languageCode,
  init: () => null,
  cacheUserLanguage: () => null,
};

i18n
  .use(languageDetector as I18nFormatModule)
  .use(initReactI18next)
  .init({
    compatibilityJSON: 'v3',
    fallbackLng: 'en',
    resources: {
      en,
      ar,
      pl,
    },
    ns: ['common', 'signIn', 'signUp'],
    defaultNS: 'common',
    debug: false,
    interpolation: {
      escapeValue: false,
    },
  });

export const language = i18n.language;

export default i18n;
