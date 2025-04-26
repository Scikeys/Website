"use client"

import { useLanguage } from "@/contexts/language-context"
import { Globe, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Image from "next/image"

interface LanguageSwitcherProps {
  variant?: "icon" | "text" | "full"
  className?: string
}

export default function LanguageSwitcher({ variant = "full", className = "" }: LanguageSwitcherProps) {
  const { language, setLanguage, isRTL } = useLanguage()

  const languages = [
    { code: "ar", name: "العربية", flag: "/images/flags/sy.ico" },
    { code: "de", name: "Deutsch", flag: "/images/flags/de.ico" },
  ]

  const handleLanguageChange = (langCode: "ar" | "de") => {
    setLanguage(langCode)
  }

  if (variant === "icon") {
    return (
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className={`rounded-full ${className}`}
            aria-label={language === "ar" ? "Auf Deutsch umschalten" : "التبديل إلى اللغة العربية"}
          >
            <Globe className="h-5 w-5" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent 
          align={isRTL ? "end" : "start"}
          className="bg-white border border-primary-custom shadow-lg"
        >
          {languages.map((lang) => (
            <DropdownMenuItem
              key={lang.code}
              onClick={() => handleLanguageChange(lang.code as "ar" | "de")}
              className="flex items-center gap-2 hover:bg-secondary-custom focus:bg-secondary-custom"
            >
              <Image src={lang.flag} alt={lang.name} width={24} height={24} className="rounded-sm" />
              <span>{lang.name}</span>
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    )
  }

  if (variant === "text") {
    return (
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className={`text-sm font-medium ${className}`}
            aria-label={language === "ar" ? "Auf Deutsch umschalten" : "التبديل إلى اللغة العربية"}
          >
            {language === "ar" ? "Deutsch" : "العربية"}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent 
          align={isRTL ? "end" : "start"}
          className="bg-white border border-primary-custom shadow-lg"
        >
          {languages.map((lang) => (
            <DropdownMenuItem
              key={lang.code}
              onClick={() => handleLanguageChange(lang.code as "ar" | "de")}
              className="flex items-center gap-2 hover:bg-secondary-custom focus:bg-secondary-custom"
            >
              <Image src={lang.flag} alt={lang.name} width={24} height={24} className="rounded-sm" />
              <span>{lang.name}</span>
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    )
  }

  // Full version - now shows only flag
  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className={`rounded-full ${className}`}
          aria-label={language === "ar" ? "Auf Deutsch umschalten" : "التبديل إلى اللغة العربية"}
        >
          <Image 
            src={language === "ar" ? "/images/flags/sy.ico" : "/images/flags/de.ico"} 
            alt={language === "ar" ? "العربية" : "Deutsch"} 
            width={28} 
            height={28} 
            className="rounded-sm"
          />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent 
        align={isRTL ? "end" : "start"}
        className="bg-white border border-primary-custom shadow-lg"
      >
        {languages.map((lang) => (
          <DropdownMenuItem
            key={lang.code}
            onClick={() => handleLanguageChange(lang.code as "ar" | "de")}
            className="flex items-center gap-2 hover:bg-secondary-custom focus:bg-secondary-custom"
          >
            <Image src={lang.flag} alt={lang.name} width={24} height={24} className="rounded-sm" />
            <span>{lang.name}</span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
