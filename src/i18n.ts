import i18n from "i18next";
import { initReactI18next } from "react-i18next";

// the translations
// (tip move them in a JSON file and import them,
// or even better, manage them separated from your code: https://react.i18next.com/guides/multiple-translation-files)
const resources = {
  ko: {
    translation: {
      // 기준정보 관리
      "Master Data Management": "기준정보 관리",
      "Customer Management": "고객 관리",

      // 도구 관리
      "Tool Management": "도구 관리",
      "Wooden Management": "목형 관리",
      "Stash Management": "적치대 관리",
      "Typesetting Paper Management": "조판지 관리",
      "Typesetting Paper Hanger Management": "조판지걸이 관리",

      // 모니터링
      Monitoring: "모니터링",
      "Process Management": "공정 관리",

      // 시스템 관리
      "System Management": "시스템 관리",

      // 기타
      Setting: "설정",
    },
  },
  en: {
    translation: {},
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
