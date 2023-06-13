import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import global from "./global.json";
import Backend from "i18next-http-backend";
const resource = {
  en: {
    translation: {
      global: global.en,
    },
  },
  ge: {
    translation: {
      global: global.ge,
    },
  },
};
i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: resource,
    fallbackLng: "en",
    lng: "en",
    debug: true,
    interpolation: {
      escapeValue: false,
    },
  });
export default i18n;