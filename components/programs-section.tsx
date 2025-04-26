"use client"

import { Handshake, BookOpen, GraduationCap } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"
import { translations } from "@/translations"

export default function ProgramsSection() {
  const { language, isRTL } = useLanguage()
  const t = translations[language]

  const getIcon = (index: number) => {
    switch (index) {
      case 0:
        return <BookOpen className="h-12 w-12 text-primary-custom" />
      case 1:
        return <GraduationCap className="h-12 w-12 text-primary-custom" />
      case 2:
        return <Handshake className="h-12 w-12 text-primary-custom" />
      default:
        return <BookOpen className="h-12 w-12 text-primary-custom" />
    }
  }

  return (
    <section id="programs" className="section-container">
      <h2 className="section-title">{t.programs.title}</h2>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {t.programs.programsList.map((program, index) => (
          <div key={index} className="flex flex-col bg-white border border-primary-custom rounded-lg shadow-md overflow-hidden h-full">
            <div className="flex-1 p-6 text-center flex flex-col justify-center items-center gap-4">
              <div>{getIcon(index)}</div>
              <div>
                <h3 className="text-xl font-bold mb-3">{program.title}</h3>
                <p className="text-muted-custom">{program.description}</p>
              </div>
            </div>

            <div className="flex-1 p-6 border-t border-primary-custom bg-secondary-custom">
              <ul className="space-y-3">
                {program.activities.map((activity, idx) => (
                  <li key={idx} className="flex items-start">
                    <span className={`text-primary-custom flex-shrink-0 ${isRTL ? "ml-2" : "mr-2"}`}>•</span>
                    <span>{activity}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-12 text-center">
        <p className="text-lg mb-6">{t.programs.conclusion}</p>
      </div>
    </section>
  )
}
