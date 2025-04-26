"use client"

import { BookOpen, Users, Award } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"
import { translations } from "@/translations"

export default function AboutSection() {
  const { language, isRTL } = useLanguage()
  const t = translations[language]

  return (
    <section id="about" className="section-container">
      {/* Title with red underline */}
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold mb-2">{t.about.title}</h2>
        <div className="w-32 h-1 bg-primary-custom mx-auto"></div>
      </div>

      {/* Introduction text */}
      <div className="mb-10">
        <p className="text-lg text-center max-w-4xl mx-auto">
          {t.about.description1}
        </p>
      </div>

      {/* Vision, Mission, Values section */}
      <div className="max-w-6xl mx-auto">
        <div className="border border-primary-custom rounded-lg overflow-hidden bg-secondary-custom">
          {/* Vision */}
          <div className="p-8">
            <div className="flex items-start">
              <BookOpen className={`h-6 w-6 text-primary-custom flex-shrink-0 ${isRTL ? "ml-4" : "mr-4"} mt-1`} />
              <div>
                <h3 className="text-xl font-bold mb-4 text-primary-custom">{t.about.vision.title}</h3>
                <p className="text-muted-custom leading-relaxed">
                  {t.about.vision.description}
                </p>
              </div>
            </div>
          </div>

          {/* Mission */}
          <div className="p-8">
            <div className="flex items-start">
              <Users className={`h-6 w-6 text-primary-custom flex-shrink-0 ${isRTL ? "ml-4" : "mr-4"} mt-1`} />
              <div>
                <h3 className="text-xl font-bold mb-4 text-primary-custom">{t.about.mission.title}</h3>
                <p className="text-muted-custom leading-relaxed">
                  {t.about.mission.description}
                </p>
              </div>
            </div>
          </div>

          {/* Values */}
          <div className="p-8">
            <div className="flex items-start">
              <Award className={`h-6 w-6 text-primary-custom flex-shrink-0 ${isRTL ? "ml-4" : "mr-4"} mt-1`} />
              <div>
                <h3 className="text-xl font-bold mb-4 text-primary-custom">{t.about.values.title}</h3>
                <p className="text-muted-custom leading-relaxed">
                  {t.about.values.description}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
