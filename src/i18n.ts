import i18n from "i18next";
import { initReactI18next } from "react-i18next";

// the translations
// (tip move them in a JSON file and import them,
// or even better, manage them separated from your code: https://react.i18next.com/guides/multiple-translation-files)
const resources = {
  ko: {
    translation: {
      "Master Data Management": "기준정보 관리",
      "Customer Management": "고객 관리",
    },
  },
  en: {
    translation: {
      "Master Data Management": "Master Data Management",
      "Customer Management": "Customer Management",
    },
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: "ko",
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
