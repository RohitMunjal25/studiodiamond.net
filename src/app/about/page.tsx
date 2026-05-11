import Link from 'next/link'
import { PageShell } from '@/components/shared/page-shell'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { SITE_CONFIG } from '@/lib/site-config'
import { luxe } from '@/components/shared/luxe-styles'
import { FileText, Shield, Sparkles, User } from 'lucide-react'

const values = [
  {
    title: 'Documents you can trust',
    description:
      'Every PDF surface is built for legible previews, obvious downloads, and metadata that helps visitors decide before they commit.',
  },
  {
    title: 'Profiles with presence',
    description:
      'Identity pages read like a studio portfolio—room for story, proof points, and media without the clutter of generic social feeds.',
  },
  {
    title: 'One restrained palette',
    description:
      'Warm cream fields and bronze accents carry from the homepage through listings of resources and people, so the brand always feels cohesive.',
  },
]

const milestones = [
  { year: '2024', text: 'Launched the combined PDF library and profile directory for boutique teams.' },
  { year: '2025', text: 'Refined reader mode, download analytics, and calmer navigation focused on two lanes only.' },
  { year: '2026', text: 'Shipped luxe editorial shells so marketing, legal, and product pages share the same visual language.' },
]

export default function AboutPage() {
  return (
    <PageShell
      title={`About ${SITE_CONFIG.name}`}
      description={`${SITE_CONFIG.name} is a calm studio for downloadable PDFs and public profiles—structured publishing without the noise of listings, classifieds, or social feeds.`}
      actions={
        <Button asChild className={luxe.btnPrimary}>
          <Link href="/contact">Contact us</Link>
        </Button>
      }
    >
      <div className="grid gap-8 lg:grid-cols-[1.12fr_0.88fr]">
        <Card className={luxe.card}>
          <CardContent className="space-y-6 p-8">
            <Badge className="border border-[#e5d9cf] bg-[#f3ebe4] text-[#5c4b42]">Our story</Badge>
            <h2 className={`font-display text-3xl font-semibold tracking-tight ${luxe.ink}`}>
              A narrow product, on purpose.
            </h2>
            <p className={`text-sm leading-7 ${luxe.muted}`}>
              We built {SITE_CONFIG.name} for teams that live inside PDFs—spec packs, onboarding decks, pricing books—and
              still need a beautiful place to introduce the humans behind the file. Profiles sit beside the library so trust
              and download intent stay connected.
            </p>
            <p className={`text-sm leading-7 ${luxe.muted}`}>
              The interface borrows cues from luxury editorial sites: generous spacing, serif headlines, and bronze CTAs
              that feel tactile instead of neon-bright.
            </p>
                      </CardContent>
        </Card>
        <div className="flex flex-col gap-4">
          {values.map((value) => (
            <Card key={value.title} className={luxe.card}>
              <CardContent className="p-6">
                <div className="flex items-start gap-3">
                  {value.title.includes('PDF') ? (
                    <FileText className="mt-0.5 h-5 w-5 shrink-0 text-[#A98E7B]" />
                  ) : value.title.includes('Profiles') ? (
                    <User className="mt-0.5 h-5 w-5 shrink-0 text-[#A98E7B]" />
                  ) : (
                    <Sparkles className="mt-0.5 h-5 w-5 shrink-0 text-[#A98E7B]" />
                  )}
                  <div>
                    <h3 className={`text-lg font-semibold ${luxe.ink}`}>{value.title}</h3>
                    <p className={`mt-2 text-sm leading-relaxed ${luxe.muted}`}>{value.description}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <div className="mt-10 grid gap-6 lg:grid-cols-3">
        <Card className={`${luxe.card} lg:col-span-3`}>
          <CardContent className="grid gap-6 p-8 md:grid-cols-[0.35fr_1fr] md:items-start">
            <div className="flex items-center gap-2">
              <Shield className="h-6 w-6 text-[#A98E7B]" />
              <h2 className={`font-display text-2xl font-semibold ${luxe.ink}`}>Studio milestones</h2>
            </div>
            <ul className="space-y-4">
              {milestones.map((m) => (
                <li key={m.year} className={`flex gap-4 border-b border-[#eadfd6] pb-4 last:border-0 last:pb-0`}>
                  <span className="font-display text-lg font-semibold text-[#A98E7B]">{m.year}</span>
                  <p className={`text-sm leading-7 ${luxe.muted}`}>{m.text}</p>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>

    </PageShell>
  )
}
