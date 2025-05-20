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
  const [isRTL, setIsRTL] = useState(true)

  // Initialize language and direction
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const browserLanguage = navigator.language.toLowerCase()
      
      // Set initial language based on browser language or stored preference
      let initialLanguage: Language = "ar" // Default to Arabic
      if (browserLanguage.startsWith("de")) {
        initialLanguage = "de" // Switch to German if browser is in German
      }
      
      // Set language state
      setLanguage(initialLanguage)
      
      // Set direction based on language
      const isRTLDirection = initialLanguage === "ar"
      document.documentElement.dir = isRTLDirection ? "rtl" : "ltr"
      document.documentElement.lang = initialLanguage
      document.body.classList.add(isRTLDirection ? "rtl" : "ltr")
      setIsRTL(isRTLDirection)
      
      setIsInitialized(true)
    }
  }, [])

  // Update direction when language changes
  useEffect(() => {
    if (isInitialized && typeof window !== 'undefined') {
      const isRTLDirection = language === "ar"
      document.documentElement.dir = isRTLDirection ? "rtl" : "ltr"
      document.documentElement.lang = language
      document.body.classList.remove("rtl", "ltr")
      document.body.classList.add(isRTLDirection ? "rtl" : "ltr")
      setIsRTL(isRTLDirection)
    }
  }, [language, isInitialized])

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
