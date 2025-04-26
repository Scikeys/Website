"use client"

import React, { createContext, useContext, useState, useEffect } from "react"

type Language = "ar" | "de"

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  isRTL: boolean
  isInitialized: boolean
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [isInitialized, setIsInitialized] = useState(false)
  const [language, setLanguage] = useState<Language>("ar")
  const isRTL = language === "ar"

  // Initialize language and direction
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedLanguage = localStorage.getItem("language") as Language
      const initialLanguage = storedLanguage || "ar"
      
      // Set language state
      setLanguage(initialLanguage)
      
      // Set direction immediately
      document.documentElement.dir = initialLanguage === "ar" ? "rtl" : "ltr"
      document.documentElement.lang = initialLanguage
      document.body.classList.add(initialLanguage === "ar" ? "rtl" : "ltr")
      
      setIsInitialized(true)
    }
  }, [])

  // Update direction when language changes
  useEffect(() => {
    if (isInitialized && typeof window !== 'undefined') {
      document.documentElement.dir = isRTL ? "rtl" : "ltr"
      document.documentElement.lang = language
      document.body.classList.remove("rtl", "ltr")
      document.body.classList.add(isRTL ? "rtl" : "ltr")
    }
  }, [language, isRTL, isInitialized])

  const value = {
    language,
    setLanguage: (lang: Language) => {
      setLanguage(lang)
      if (typeof window !== 'undefined') {
        localStorage.setItem("language", lang)
      }
    },
    isRTL,
    isInitialized
  }

  // Don't render children until initialized
  if (!isInitialized) {
    return null
  }

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}
