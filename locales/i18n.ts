import * as Localization from "expo-localization";
import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import da from "./da.json";
import en from "./en.json";

i18n
  .use(initReactI18next)
  .init({
    compatibilityJSON: "v4",
    fallbackLng: "en",
    lng: Localization.locale.split("-")[0],
    resources: {
      en: { translation: en },
      da: { translation: da },
    },
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;