import { Mail, Phone, Github, Linkedin, Instagram, Twitter } from "lucide-react"
import type { Metadata } from "next"

const page = () => {
  const contactInfo = [
    {
      icon: <Mail className="w-6 h-6" />,
      label: "Email",
      value: "sharmahritjeet@gmail.com",
      href: "mailto:sharmahritjeet@gmail.com",
    },
    {
      icon: <Phone className="w-6 h-6" />,
      label: "Phone",
      value: "+91 90548 99358",
      href: "tel:+91 90548 99358",
    },
  ]

  const socialLinks = [
    {
      icon: <Linkedin className="w-6 h-6" />,
      href: "https://www.linkedin.com/in/hritujeet-sharma-797ba7281/",
      label: "LinkedIn",
      color: "btn-primary",
    },
    {
      icon: <Github className="w-6 h-6" />,
      href: "https://github.com/Hritujeet/",
      label: "GitHub",
      color: "btn-neutral",
    },
    {
      icon: <Instagram className="w-6 h-6" />,
      href: "https://www.instagram.com/hritujeet/",
      label: "Instagram",
      color: "btn-secondary",
    },
    {
      icon: <Twitter className="w-6 h-6" />,
      href: "https://x.com/HritujeetS93526",
      label: "Twitter",
      color: "btn-accent",
    },
  ]

  return (
    <div className="min-h-screen bg-base-100">
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Get In Touch</h1>
          <p className="text-lg opacity-70">{"Let's connect and discuss your next project"}</p>
        </div>

        {/* Contact Card */}
        <div className="flex justify-center">
          <div className="card bg-base-200 shadow-xl max-w-md w-full">
            <div className="card-body">
              <h2 className="card-title text-2xl mb-6">Contact Information</h2>

              {/* Contact Details */}
              <div className="space-y-6 mb-8">
                {contactInfo.map((contact, index) => (
                  <div key={index} className="flex items-center gap-4">
                    <div>
                      <p className="text-sm opacity-70">{contact.label}</p>
                      <a href={contact.href} className="link link-hover font-medium">
                        {contact.value}
                      </a>
                    </div>
                  </div>
                ))}
              </div>

              {/* Divider */}
              <div className="divider"></div>

              {/* Social Links */}
              <div>
                <h3 className="text-lg font-semibold mb-4">Connect With Me</h3>
                <div className="flex gap-3 flex-wrap">
                  {socialLinks.map((social, index) => (
                    <a
                      key={index}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`btn btn-circle ${social.color} btn-sm hover:scale-110 transition-transform`}
                      aria-label={social.label}
                    >
                      {social.icon}
                    </a>
                  ))}
                </div>
              </div>

              {/* Call to Action */}
              <div className="card-actions justify-center mt-8">
                <a href="mailto:sharmahritjeet@gmail.com" className="btn btn-primary btn-wide">
                  <Mail className="w-4 h-4" />
                  Send Email
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Additional Info */}
        <div className="text-center mt-12">
          <div className="alert alert-info max-w-md mx-auto">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              className="stroke-current shrink-0 w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              ></path>
            </svg>
            <span>I typically respond within 24 hours!</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export const metadata: Metadata = {
  title: "Contact | Hritujeet",
  description:
    "Hey, there! I am Hritujeet, a web dev enthusiast as a teenage developer. I love to build things and share my knowledge with the world. Get in Touch with me for any queries or collaborations.",
  keywords:
    "contact, web development, programming, blogs, tech trends, developer community, insights, Hritujeet Sharma, teenage developer, coding enthusiast, web dev, Next.js, React, JavaScript, tech blogs, software development, coding tutorials, personal blog, tech enthusiast, coding community, web design, frontend development, backend development, full-stack development, open source, tech education, coding resources, developer portfolio",
}

export default page
