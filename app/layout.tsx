import type React from "react"
import type { Metadata } from "next"
import { Tajawal, Roboto } from "next/font/google"
import "./globals.css"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { LanguageProvider } from "@/contexts/language-context"
import { Analytics } from "@vercel/analytics/react"
import { SpeedInsights } from "@vercel/speed-insights/next"

// Use Tajawal font which supports Arabic characters well
const tajawal = Tajawal({
  subsets: ["arabic"],
  weight: ["400", "500", "700"],
  variable: "--font-tajawal",
})

// Use Roboto for German text
const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-roboto",
})

export const metadata: Metadata = {
  title: "مبادرة مفاتيح العلوم | SciKeys",
  description:
    "مبادرة لتعزيز التعاون الأكاديمي بين الجامعات السورية والألمانية | Eine Initiative zur Förderung der akademischen Zusammenarbeit zwischen syrischen und deutschen Universitäten",
  keywords: [
    // English keywords
    "Syrian universities",
    "German universities",
    "academic cooperation",
    "SciKeys",
    "Syrian-German initiative",
    "higher education Syria",
    "academic bridges",
    "scientific research Syria",
    "Syrian students Germany",
    "academic exchange",
    // Arabic keywords
    "مفاتيح العلوم",
    "الجامعات السورية",
    "التعاون الأكاديمي",
    "التبادل العلمي",
    "التعليم العالي",
    "التعاون الأكاديمي بين الجامعات السورية والألمانية",
    "التعليم العالي السوري",
    // German keywords
    "Syrische Universitäten",
    "Deutsche Universitäten",
    "Akademische Zusammenarbeit",
    "Wissenschaftlicher Austausch",
    "Hochschulbildung Syrien",
    "Akademische Brücken",
    "Wissenschaftliche Forschung Syrien",
    "Syrische Studenten Deutschland",
    "Bildungsinitiative",
    "Wissenschaftskooperation",
    "Deutsch-Syrische Initiative",
    "Akademischer Austausch"
  ].join(", "),
  openGraph: {
    title: "SciKeys - Syrian-German Academic Initiative | Deutsch-Syrische Bildungsinitiative",
    description: "Promoting academic cooperation between Syrian and German universities | Förderung der akademischen Zusammenarbeit zwischen syrischen und deutschen Universitäten",
    url: "https://scikeys.de",
    siteName: "SciKeys Initiative",
    images: [
      {
        url: "/images/scikeys-logo.png",
        width: 1200,
        height: 630,
        alt: "SciKeys Initiative Logo"
      }
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "SciKeys - Syrian-German Academic Initiative | Deutsch-Syrische Bildungsinitiative",
    description: "Promoting academic cooperation between Syrian and German universities | Förderung der akademischen Zusammenarbeit zwischen syrischen und deutschen Universitäten",
    images: ["/images/scikeys-logo.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION
  },
  icons: {
    icon: [
      {
        url: '/logo.ico'
      }
    ],
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html suppressHydrationWarning>
      <body className={`${tajawal.variable} ${roboto.variable} font-sans bg-white`}>
        <LanguageProvider>
          <Header />
          <main>{children}</main>
          <Analytics />
          <SpeedInsights />
          <Footer />
        </LanguageProvider>
      </body>
    </html>
  )
}
