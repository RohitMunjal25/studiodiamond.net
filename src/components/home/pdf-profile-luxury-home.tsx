import Link from 'next/link'
import { ArrowRight, FileText, Quote, Sparkles, User } from 'lucide-react'
import { ContentImage } from '@/components/shared/content-image'
import { SITE_CONFIG, type TaskKey } from '@/lib/site-config'
import { siteContent } from '@/config/site.content'
import type { SitePost } from '@/lib/site-connector'
import { getPostTaskKey } from '@/lib/task-data'

/** Local asset in `/public` — remote Pixabay URLs are blocked by Cloudflare/CSP in many environments. */
const HERO_IMAGE_SRC = '/hero-section.png'

type TaskConfig = (typeof SITE_CONFIG.tasks)[number]

function getTaskHref(task: TaskKey, slug: string) {
  const route = SITE_CONFIG.tasks.find((item) => item.key === task)?.route || `/${task}`
  return `${route}/${slug}`
}

function getPostImage(post?: SitePost | null) {
  const media = Array.isArray(post?.media) ? post?.media : []
  const mediaUrl = media.find((item) => typeof item?.url === 'string' && item.url)?.url
  const contentImage =
    typeof post?.content === 'object' && post?.content && Array.isArray((post.content as { images?: string[] }).images)
      ? (post.content as { images?: string[] }).images?.find((url: unknown) => typeof url === 'string' && url)
      : null
  const logo =
    typeof post?.content === 'object' && post?.content && typeof (post.content as { logo?: string }).logo === 'string'
      ? (post.content as { logo?: string }).logo
      : null
  return mediaUrl || contentImage || logo || '/placeholder.svg?height=900&width=1400'
}

function resolvePostTask(post: SitePost, fallback: TaskKey): TaskKey {
  const key = getPostTaskKey(post)
  if (key === 'pdf' || key === 'profile') return key
  return fallback
}

export function PdfProfileLuxuryHome({
  pdfPosts,
  profilePosts,
  primaryTask,
}: {
  pdfPosts: SitePost[]
  profilePosts: SitePost[]
  primaryTask?: TaskConfig
}) {
  const copy = siteContent.luxuryHome
  const projectPool = [
    ...pdfPosts.map((post) => ({ post, key: 'pdf' as const })),
    ...profilePosts.map((post) => ({ post, key: 'profile' as const })),
  ]
  const projects = projectPool.slice(0, 6)
  const collage = [...profilePosts, ...pdfPosts].slice(0, 4)

  return (
    <main className="bg-[#F9F7F4] text-[#2a211c]">
      <section className="relative min-h-[min(88vh,800px)] w-full overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={HERO_IMAGE_SRC}
            alt=""
            className="h-full w-full min-h-[min(88vh,800px)] object-cover object-center"
            loading="eager"
            fetchPriority="high"
            decoding="async"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/82 via-black/58 to-black/38" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-black/25" />
        </div>
        <div className="relative mx-auto flex min-h-[min(88vh,800px)] max-w-7xl flex-col justify-center px-4 py-24 sm:px-6 lg:px-8">
          <p className="max-w-xl text-xs font-semibold uppercase tracking-[0.28em] text-white/95 [text-shadow:0_1px_18px_rgba(0,0,0,0.55)]">
            {copy.heroEyebrow}
          </p>
          <h1 className="mt-5 max-w-3xl font-display text-4xl font-semibold leading-[1.08] tracking-[-0.04em] text-white sm:text-5xl lg:text-6xl [text-shadow:0_2px_28px_rgba(0,0,0,0.55)]">
            {copy.heroTitle}
          </h1>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-white/95 [text-shadow:0_1px_16px_rgba(0,0,0,0.5)]">
            {copy.heroDescription}
          </p>
          <div className="mt-10 flex flex-wrap gap-3">
            <Link
              href={primaryTask?.route || '/pdf'}
              className="inline-flex items-center gap-2 rounded-md bg-[#A98E7B] px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-[#957a68]"
            >
              Contact us
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/pdf"
              className="inline-flex items-center gap-2 rounded-md border border-white/70 bg-transparent px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
            >
              See works
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      <section className="relative z-10 mx-auto -mt-10 max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-4 rounded-2xl border border-[#e8dfd6] bg-[#f1e8e0] px-6 py-8 shadow-sm sm:grid-cols-2 lg:grid-cols-4">
          {copy.stats.map((row) => (
            <div key={row.label} className="text-center">
              <p className="font-display text-3xl font-semibold tracking-tight text-[#2a211c] sm:text-4xl">{row.num}</p>
              <p className="mt-1 text-sm text-[#6b584d]">{row.label}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#8a7265]">{copy.introEyebrow}</p>
            <h2 className="mt-4 max-w-xl font-display text-3xl font-semibold tracking-[-0.03em] text-[#2a211c] sm:text-4xl">{copy.introTitle}</h2>
            <div className="mt-6 space-y-4 text-sm leading-7 text-[#5c4b42]">
              {copy.introCopy.map((p, idx) => (
                <p key={idx}>{p}</p>
              ))}
            </div>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/pdf" className="inline-flex items-center gap-2 rounded-md bg-[#A98E7B] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#957a68]">
                PDF library
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3 sm:gap-4">
            {collage.length ? (
              collage.map((post, i) => {
                const tall = i % 2 === 0
                return (
                  <div
                    key={post.id}
                    className={`relative overflow-hidden rounded-2xl border border-[#e5d9cf] bg-white shadow-sm ${tall ? 'row-span-2 min-h-[220px] sm:min-h-[280px]' : 'min-h-[120px] sm:min-h-[140px]'}`}
                  >
                    <ContentImage src={getPostImage(post)} alt={post.title} fill className="object-cover" />
                  </div>
                )
              })
            ) : (
              <>
                <div className="relative min-h-[200px] overflow-hidden rounded-2xl border border-[#e5d9cf] bg-[#efe6df]" />
                <div className="relative min-h-[120px] overflow-hidden rounded-2xl border border-[#e5d9cf] bg-[#e8ddd4]" />
                <div className="relative col-span-2 min-h-[160px] overflow-hidden rounded-2xl border border-[#e5d9cf] bg-[#f3ebe4]" />
              </>
            )}
          </div>
        </div>
      </section>

      <section className="border-y border-[#eadfd6] bg-[#faf6f2] py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-center font-display text-3xl font-semibold tracking-[-0.03em] text-[#2a211c] sm:text-4xl">{copy.servicesTitle}</h2>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {copy.services.filter((svc) => svc.href !== '/profile').map((svc) => {
              const highlight = 'highlight' in svc && svc.highlight
              return (
                <Link
                  key={svc.title}
                  href={svc.href}
                  className={`flex flex-col rounded-2xl border px-6 py-8 transition hover:-translate-y-0.5 hover:shadow-md ${
                    highlight
                      ? 'border-[#A98E7B] bg-[#A98E7B] text-white shadow-sm'
                      : 'border-[#e5d9cf] bg-[#fffdf9] text-[#2a211c]'
                  }`}
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-full border border-current/15 bg-white/10">
                    {svc.href === '/pdf' ? (
                      <FileText className={`h-5 w-5 ${highlight ? 'text-white' : 'text-[#A98E7B]'}`} />
                    ) : (
                      <Sparkles className={`h-5 w-5 ${highlight ? 'text-white' : 'text-[#A98E7B]'}`} />
                    )}
                  </div>
                  <h3 className="mt-6 font-display text-xl font-semibold">{svc.title}</h3>
                  <p className={`mt-3 flex-1 text-sm leading-7 ${highlight ? 'text-white/90' : 'text-[#6b584d]'}`}>{svc.body}</p>
                  <span className={`mt-6 inline-flex items-center gap-2 text-sm font-semibold ${highlight ? 'text-white' : 'text-[#A98E7B]'}`}>
                    See more
                    <ArrowRight className="h-4 w-4" />
                  </span>
                </Link>
              )
            })}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <h2 className="font-display text-3xl font-semibold tracking-[-0.03em] text-[#2a211c] sm:text-4xl">{copy.projectsTitle}</h2>
          <Link href="/pdf" className="text-sm font-semibold text-[#A98E7B] hover:text-[#8a7265]">
            View all
            <ArrowRight className="ml-1 inline h-4 w-4" />
          </Link>
        </div>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {projects.length ? (
            projects.map(({ post, key }, index) => (
              <Link
                key={post.id}
                href={getTaskHref(key, post.slug)}
                className="group relative overflow-hidden rounded-2xl border-8 border-white bg-white shadow-sm"
              >
                <div className="relative aspect-[4/3] w-full">
                  <ContentImage src={getPostImage(post)} alt={post.title} fill className="object-cover transition duration-500 group-hover:scale-[1.03]" />
                </div>
                <span className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-sm font-semibold text-[#2a211c] shadow">
                  {index + 1}
                </span>
                <div className="p-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#8a7265]">{key === 'pdf' ? 'PDF' : 'Profile'}</p>
                  <p className="mt-1 font-semibold text-[#2a211c]">{post.title}</p>
                </div>
              </Link>
            ))
          ) : (
            <p className="col-span-full text-center text-sm text-[#6b584d]">Fresh PDFs and profiles will appear here as soon as they are published.</p>
          )}
        </div>
      </section>

      <section className="bg-[#f3ebe4] py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <Quote className="h-10 w-10 text-[#A98E7B] mx-auto" />
            <p className="mt-6 font-display text-xl italic leading-relaxed text-[#3d3229] sm:text-2xl">&ldquo;{copy.testimonial}&rdquo;</p>
            <p className="mt-6 text-sm font-semibold text-[#6b584d]">{copy.testimonialBy}</p>
          </div>
        </div>
      </section>
    </main>
  )
}
