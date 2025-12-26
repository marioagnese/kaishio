"use client";

import {
  createContext,
  useContext,
  useState,
  type ReactNode,
} from "react";

export type Language = "en" | "pt" | "es";

type LanguageContextValue = {
  lang: Language;
  setLang: (lang: Language) => void;
};

const LanguageContext = createContext<LanguageContextValue | undefined>(
  undefined
);

export function LanguageProvider({ children }: { children: ReactNode }) {
  // Initialize from localStorage once (client-side), no effect + setState needed
  const [lang, setLangState] = useState<Language>(() => {
    if (typeof window !== "undefined") {
      const stored = window.localStorage.getItem("kaishio-lang");
      if (stored === "en" || stored === "pt" || stored === "es") {
        return stored;
      }
    }
    return "en";
  });

  const setLang = (value: Language) => {
    setLangState(value);
    if (typeof window !== "undefined") {
      window.localStorage.setItem("kaishio-lang", value);
    }
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage(): LanguageContextValue {
  const ctx = useContext(LanguageContext);
  if (!ctx) {
    throw new Error(
      "useLanguage must be used within a LanguageProvider"
    );
  }
  return ctx;
}
