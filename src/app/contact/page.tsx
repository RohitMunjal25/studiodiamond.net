import { FileText, Mail, MapPin, Phone, Sparkles, User } from 'lucide-react'
import { NavbarShell } from '@/components/shared/navbar-shell'
import { Footer } from '@/components/shared/footer'
import { SITE_CONFIG } from '@/lib/site-config'
import { luxe } from '@/components/shared/luxe-styles'
import { CONTACT_PAGE_OVERRIDE_ENABLED, ContactPageOverride } from '@/overrides/contact-page'

const tone = {
  shell: luxe.page,
  panel: `${luxe.card} p-8`,
  soft: `${luxe.soft} p-5`,
  muted: luxe.muted,
  action: luxe.btnPrimary,
}

const lanes = [
  {
    icon: FileText,
    title: 'PDF publishing & files',
    body: 'Ask about catalog structure, download permissions, or how to refresh a living document set without breaking links.',
  },
  {
    icon: User,
    title: 'Profiles & bios',
    body: 'We help teams tune headline copy, media order, and trust cues so every profile reads like a crafted introduction.',
  },
  {
    icon: Mail,
    title: 'Partnerships & press',
    body: 'Licensing, co-marketing, or editorial collaborations—tell us the timeline and we will match you with the right studio lead.',
  },
]

export default function ContactPage() {
  if (CONTACT_PAGE_OVERRIDE_ENABLED) {
    return <ContactPageOverride />
  }

  return (
    <div className={`${tone.shell} flex min-h-screen flex-col`}>
      <NavbarShell />
      <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-14 sm:px-6 lg:px-8">
        <section className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
          <div>
            <p className={luxe.eyebrow}>Contact {SITE_CONFIG.name}</p>
            <h1 className={`mt-4 max-w-2xl ${luxe.h1} ${luxe.ink}`}>Let’s talk PDFs, profiles, or your next launch.</h1>
            <p className={`mt-5 max-w-xl text-base leading-relaxed ${tone.muted}`}>
              Share what you are publishing, who needs access, and what success looks like. We route studio questions to
              the same calm rhythm as the rest of the site—no generic ticket black holes.
            </p>
            <div className="mt-8">
              <div className={tone.soft}>
                <MapPin className="h-5 w-5 text-[#A98E7B]" />
                <p className={`mt-3 text-sm font-semibold ${luxe.ink}`}>Visit by appointment</p>
                <p className={`mt-1 text-sm ${tone.muted}`}>Portland & remote hybrid · Schedule via form</p>
              </div>
            </div>
            <div className="mt-10 space-y-4">
              {lanes.map((lane) => (
                <div key={lane.title} className={tone.soft}>
                  <lane.icon className="h-5 w-5 text-[#A98E7B]" />
                  <h2 className={`mt-3 text-lg font-semibold ${luxe.ink}`}>{lane.title}</h2>
                  <p className={`mt-2 text-sm leading-relaxed ${tone.muted}`}>{lane.body}</p>
                </div>
              ))}
            </div>
          </div>

          <div className={tone.panel}>
            <div className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-[#A98E7B]" />
              <h2 className={`font-display text-2xl font-semibold ${luxe.ink}`}>Send a message</h2>
            </div>
            <p className={`mt-2 text-sm ${tone.muted}`}>We read every note and reply within one business day when possible.</p>
            <form className="mt-6 grid gap-4">
              <input
                className="h-12 rounded-xl border border-[#e5d9cf] bg-white px-4 text-sm text-[#2a211c] placeholder:text-[#9a8578]"
                placeholder="Your name"
              />
              <input
                className="h-12 rounded-xl border border-[#e5d9cf] bg-white px-4 text-sm text-[#2a211c] placeholder:text-[#9a8578]"
                placeholder="Email address"
                type="email"
              />
              <input
                className="h-12 rounded-xl border border-[#e5d9cf] bg-white px-4 text-sm text-[#2a211c] placeholder:text-[#9a8578]"
                placeholder="Topic (e.g. PDF refresh, profile audit)"
              />
              <textarea
                className="min-h-[180px] rounded-2xl border border-[#e5d9cf] bg-white px-4 py-3 text-sm text-[#2a211c] placeholder:text-[#9a8578]"
                placeholder="Tell us timelines, links, and what a great outcome looks like."
              />
              <button type="submit" className={`h-12 w-full ${tone.action}`}>
                Send message
              </button>
            </form>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
