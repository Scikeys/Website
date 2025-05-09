"use client"

import Link from "next/link"
import Image from "next/image"
import { Mail, Phone, Instagram, Facebook, Linkedin } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"
import { translations } from "@/translations"
import LanguageSwitcher from "./language-switcher"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"

export default function Footer() {
  const { language, isRTL, setLanguage } = useLanguage()
  const t = translations[language]
  const currentYear = new Date().getFullYear()

  const openSocialMedia = (platform: string) => {
    const urls = {
      x: {
        ios: 'twitter://user?screen_name=scikeys',
        android: 'intent://x.com/scikeys#Intent;package=com.twitter.android;scheme=https;end',
        web: 'https://x.com/scikeys'
      },
      facebook: {
        ios: 'fb://profile/scikeys',
        android: 'fb://page/scikeys#Intent;package=com.facebook.katana;scheme=https;end',
        web: 'https://www.facebook.com/scikeys'
      },
      instagram: {
        ios: 'instagram://user?username=scikeys',
        android: 'intent://instagram.com/_u/scikeys#Intent;package=com.instagram.android;scheme=https;end',
        web: 'https://www.instagram.com/scikeys'
      },
      linkedin: {
        ios: 'linkedin://company/scikeys',
        android: 'intent://linkedin.com/company/scikeys#Intent;package=com.linkedin.android;scheme=https;end',
        web: 'https://www.linkedin.com/company/scikeys'
      },
      whatsapp: {
        ios: 'https://wa.me/4915755229655',
        android: 'https://wa.me/4915755229655#Intent;package=com.whatsapp;scheme=https;end',
        web: 'https://wa.me/4915755229655'
      }
    }

    const platformUrls = urls[platform as keyof typeof urls]
    if (!platformUrls) return

    // Check if we're on iOS or Android
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent)
    const isAndroid = /Android/.test(navigator.userAgent)

    // Create a hidden iframe to handle the app opening
    const iframe = document.createElement('iframe')
    iframe.style.display = 'none'
    document.body.appendChild(iframe)

    // Try to open the app
    if (isIOS) {
      window.location.href = platformUrls.ios
      // On iOS, we can detect if the app opened by checking if we're still on the page
      setTimeout(() => {
        if (document.hasFocus()) {
          // If we're still on the page, the app didn't open
          window.location.href = platformUrls.web
        }
      }, 1000)
    } else if (isAndroid) {
      // For Android, use the iframe to handle the intent
      iframe.src = platformUrls.android
      // If the app doesn't open, the iframe will trigger the web fallback
      setTimeout(() => {
        if (document.hasFocus()) {
          window.location.href = platformUrls.web
        }
      }, 1000)
    } else {
      window.location.href = platformUrls.web
    }

    // Clean up the iframe after a delay
    setTimeout(() => {
      document.body.removeChild(iframe)
    }, 2000)
  }

  return (
    <footer className="bg-secondary-custom border-t border-primary-custom">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex flex-col items-start mb-4">
              <Image
                src="/images/scikeys-logo.png"
                alt={t.footer.title}
                width={200}
                height={80}
                className="mb-3"
              />
              <h3 className="text-lg font-bold text-primary-custom">
                {t.footer.title}
              </h3>
            </div>
            <p className="text-muted-custom mb-4">{t.footer.description}</p>

            <LanguageSwitcher variant="full" />
          </div>

          <div>
            <h3 className="text-lg font-bold text-primary-custom mb-4">{t.footer.quickLinks}</h3>
            <ul className="space-y-2">
              {t.footer.links.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-muted-custom hover:text-primary-custom">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-bold text-primary-custom mb-4">{t.footer.contactUs}</h3>
            <ul className="space-y-2">
              <li className="flex items-start">
                <Mail className={`h-5 w-5 ${isRTL ? "ml-2" : "mr-2"} text-primary-custom`} />
                <span className="text-muted-custom">{t.footer.email}</span>
              </li>
              <li className="flex items-start">
                <Phone className={`h-5 w-5 ${isRTL ? "ml-2" : "mr-2"} text-primary-custom`} />
                <a
                  href="tel:+49 1575 5229655"
                  rel="noopener noreferrer"
                  className="text-muted-custom hover:text-primary-custom transition-colors"
                  dir="ltr"
                >
                  {t.footer.phone}
                </a>
              </li>

              <li className="flex items-center" style={{ marginTop: "2rem" }}>
                <div className="flex gap-7">
                  <button
                    onClick={() => openSocialMedia('x')}
                    className="text-[#000000] hover:text-[#000000] transition-colors"
                  >
                    <svg
                      className="h-6 w-6"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                    </svg>
                  </button>
                  <button
                    onClick={() => openSocialMedia('facebook')}
                    className="text-[#1877F2] hover:text-[#0B5ED7] transition-colors"
                  >
                    <Facebook className="h-6 w-6" />
                  </button>
                  <button
                    onClick={() => openSocialMedia('instagram')}
                    className="text-[#E1306C] hover:text-[#C13584] transition-colors"
                  >
                    <Instagram className="h-6 w-6" />
                  </button>
                  <button
                    onClick={() => openSocialMedia('linkedin')}
                    className="text-[#0077B5] hover:text-[#005E93] transition-colors"
                  >
                    <Linkedin className="h-6 w-6" />
                  </button>
                  <button
                    onClick={() => openSocialMedia('whatsapp')}
                    className="text-[#25D366] hover:text-[#128C7E] transition-colors"
                  >
                    <svg
                      className="h-6 w-6"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                    </svg>
                  </button>
                </div>
              </li>

              <li className="flex items-center mt-6" style={{ marginTop: "20px" }}>
                <div>
                  <p className="font-bold text-primary-custom mb-2">{t.footer.sponsoredBy}</p>
                  <div className="flex items-center">
                    <Image
                      src="/images/ssud.png"
                      alt={t.footer.committee}
                      width={80}
                      height={40}
                      className="mr-2"
                    />
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-primary-custom text-center">
          <div className="flex flex-col items-center space-y-2">
            <p className="text-muted-custom">
              &copy; {currentYear} {t.footer.title}. {t.footer.rights}
            </p>
            <Link 
              href="/privacy-policy"
              className="text-muted-custom hover:text-primary-custom transition-colors"
            >
              {t.footer.privacyPolicy}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
