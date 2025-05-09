"use client"

import Hero from "@/components/hero"
import AboutSection from "@/components/about-section"
import ChallengesSection from "@/components/challenges-section"
import ProgramsSection from "@/components/programs-section"
import ContactSection from "@/components/contact-section"
import ResourcesSection from "@/components/resources-section"
import { useLanguage } from "@/contexts/language-context"
import { useEffect } from "react"
import Head from "next/head"

export default function Home() {
  const { language, isRTL } = useLanguage()

  // Update document direction when language changes
  useEffect(() => {
    document.documentElement.dir = isRTL ? "rtl" : "ltr"
    document.documentElement.lang = language

    // Force layout recalculation
    document.body.style.display = "none"
    document.body.offsetHeight // Force a reflow
    document.body.style.display = ""
  }, [language, isRTL])

  return (
    <>
      <Head>
        <meta name="description" content="SciKeys Initiative - Promoting academic cooperation between Syrian and German universities. Supporting higher education in Syria through modern curricula and research collaboration." />
        <meta name="keywords" content="Syrian universities, German universities, academic cooperation, SciKeys, Syrian-German initiative, higher education Syria" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="SciKeys - Syrian-German Academic Initiative" />
        <meta property="og:description" content="Promoting academic cooperation between Syrian and German universities" />
        <meta property="og:image" content="/images/scikeys-logo.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="SciKeys - Syrian-German Academic Initiative" />
        <meta name="twitter:description" content="Promoting academic cooperation between Syrian and German universities" />
        <meta name="twitter:image" content="/images/scikeys-logo.png" />
        <link rel="canonical" href="https://scikeys.de" />
      </Head>
      <main>
        <Hero />
        <AboutSection />
        <ChallengesSection />
        <ProgramsSection />
        <ResourcesSection />
        <ContactSection />
      </main>
    </>
  )
}
