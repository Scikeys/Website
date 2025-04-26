"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Menu, X } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"
import { translations } from "@/translations"
import LanguageSwitcher from "./language-switcher"

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { language, isRTL } = useLanguage()
  const t = translations[language]

  // Set initial direction immediately
  useEffect(() => {
    document.documentElement.dir = isRTL ? "rtl" : "ltr"
    document.documentElement.lang = language
  }, [language, isRTL])

  // Add initial direction class to body
  useEffect(() => {
    document.body.classList.add(isRTL ? "rtl" : "ltr")
    return () => {
      document.body.classList.remove(isRTL ? "rtl" : "ltr")
    }
  }, [isRTL])

  const navigation = [
    { name: t.nav.home, href: "#" },
    { name: t.nav.about, href: "#about" },
    { name: t.nav.challenges, href: "#challenges" },
    { name: t.nav.programs, href: "#programs" },
   // { name: isRTL ? "الإنجازات" : t.nav.achievements, href: "#achievements" },
    { name: t.nav.resources, href: "#resources" },
    { name: t.nav.contact, href: "#contact" },
  ]

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault()
    if (window.location.pathname === "/privacy-policy") {
      // If we're on privacy policy page, navigate to main page
      window.location.href = "/"
    } else if (href === "#") {
      // If clicking home on main page, just scroll to top without reload
      window.scrollTo({ top: 0, behavior: "smooth" })
    } else {
      // Scroll to section
      const element = document.getElementById(href.substring(1))
      if (element) {
        element.scrollIntoView({ behavior: "smooth" })
      }
    }
    setMobileMenuOpen(false)
  }

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" aria-label="Top">
        <div className="w-full py-2 flex items-center justify-between border-b border-gray-200 lg:border-none">
          {/* Logo and navigation */}
          <div className="flex items-center">
            <div className="flex items-center flex-shrink-0 lg:mr-8 rtl:lg:ml-8 rtl:lg:mr-0">
              <Link href="#" className="flex items-center" onClick={(e) => handleNavClick(e, "#")}>
                <Image
                  src="/images/scikeys-logo.png"
                  alt={isRTL ? "مبادرة مفاتيح العلوم" : "SciKeys Initiative"}
                  width={120}
                  height={50}
                  className={isRTL ? "ml-2" : "mr-2"}
                />
              </Link>
            </div>
            <div className="hidden lg:flex space-x-4 space-x-reverse rtl:space-x-reverse ltr:space-x-normal">
              {navigation.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className="text-sm font-medium text-gray-900 hover:text-primary-custom transition-colors whitespace-nowrap px-2 py-2"
                >
                  {link.name}
                </a>
              ))}
            </div>
          </div>

          {/* Language switcher and mobile menu */}
          <div className="flex items-center gap-4">
            <div className="hidden lg:block">
              <LanguageSwitcher variant="full" />
            </div>
            <div className="lg:hidden">
              <LanguageSwitcher variant="full" />
            </div>
            <button type="button" className="text-gray-700 lg:hidden" onClick={() => setMobileMenuOpen(true)}>
              <span className="sr-only">{isRTL ? "فتح القائمة" : "Menü öffnen"}</span>
              <Menu className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-50 bg-black bg-opacity-50">
          <div
            className={`fixed inset-y-0 ${
              isRTL ? "right-0" : "left-0"
            } z-50 w-full bg-white px-6 py-6 overflow-y-auto sm:max-w-sm sm:ring-1 sm:ring-gray-900/10`}
          >
            <div className="flex items-center justify-between">
              <Link href="/" className="-m-1.5 p-1.5 flex items-center" onClick={(e) => handleNavClick(e, "/")}>
                <Image
                  src="/images/scikeys-logo.png"
                  alt={isRTL ? "مبادرة مفاتيح العلوم" : "SciKeys Initiative"}
                  width={180}
                  height={60}
                  className={isRTL ? "ml-2" : "mr-2"}
                />
              </Link>
              <button
                type="button"
                className="-m-2.5 rounded-md p-2.5 text-gray-700"
                onClick={() => setMobileMenuOpen(false)}
              >
                <span className="sr-only">{isRTL ? "إغلاق القائمة" : "Menü schließen"}</span>
                <X className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>
            <div className="mt-6 flow-root">
              <div className="-my-6 divide-y divide-gray-200">
                <div className="space-y-2 py-6">
                  {navigation.map((link) => (
                    <Link
                      key={link.name}
                      href={link.href}
                      onClick={(e) => handleNavClick(e, link.href)}
                      className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                    >
                      {link.name}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
