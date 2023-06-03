import i18n from "i18next";
import { initReactI18next } from "react-i18next";

// Import translations
import translationEN from "./locales/en.json"; // English translations
import translationTH from "./locales/th.json"; // Spanish translations

const resources = {
  en: {
    translation: translationEN,
  },
  th: {
    translation: translationTH,
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: "en", // Default language
  fallbackLng: "en", // Fallback language if translation is missing
  interpolation: {
    escapeValue: false, // React already escapes values to prevent XSS
  },
});

export default i18n;
