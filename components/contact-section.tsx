"use client"

import type React from "react"
import { useState } from "react"
import { Mail, Phone, Send } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"
import { translations } from "@/translations"
import { sendEmail } from "@/app/actions/send-email"

export default function ContactSection() {
  const { language, isRTL } = useLanguage()
  const t = translations[language]

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    organization: "",
    message: "",
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitMessage, setSubmitMessage] = useState("")
  const [submitStatus, setSubmitStatus] = useState("")

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const result = await sendEmail(formData)

      if (result.success) {
        setSubmitStatus("success")
        setSubmitMessage(t.contact.successMessage)
        setFormData({ name: "", email: "", organization: "", message: "" })
      } else {
        setSubmitStatus("error")
        setSubmitMessage(t.contact.errorMessage)
      }
    } catch (error) {
      console.error("Error sending email:", error)
      setSubmitStatus("error")
      setSubmitMessage(t.contact.errorMessage)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section id="contact" className="section-container bg-secondary-custom">
      <h2 className="section-title">{t.contact.title}</h2>

        <div>
          <p className="mb-8 text-lg">{t.contact.description}</p>

          <div className="space-y-6">
            <div className="flex items-start">
              <Mail className={`h-6 w-6 text-primary-custom ${isRTL ? "ml-4" : "mr-4"} mt-1`} />
              <div>
                <h4 className="font-bold mb-1">{t.contact.email}</h4>
                <p className="text-muted-custom">{t.contact.emailValue}</p>
              </div>
            </div>

            <div className="flex items-start">
              <Phone className={`h-6 w-6 text-primary-custom ${isRTL ? "ml-4" : "mr-4"} mt-1`} />
              <div>
                <h4 className="font-bold mb-1">{t.contact.phone}</h4>
                <p className="text-muted-custom">
                  <a
                    href="tel:+49 1575 5229655"
                    className="hover:text-primary-custom transition-colors"
                    dir="ltr"
                  >
                    {isRTL ? "\u202A+49 1575 5229655\u202C" : t.contact.phoneValue}
                  </a>
                </p>
              </div>
            </div>
          </div>

          <div className="mt-8 flex justify-center">
            <a
              href="https://forms.gle/YhtWatbeQauFnu5B9"
              className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-primary-custom hover:bg-primary-custom/90 transition-colors"
            >
              <Send className={`h-5 w-5 ${isRTL ? "ml-2" : "mr-2"}`} />
              {t.contact.joinInitiative}
            </a>
          </div>
        </div>
            </section>
  )
}
