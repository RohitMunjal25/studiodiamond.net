import type { TaskKey } from '@/lib/site-config'

export const siteContent = {
  navbar: {
    tagline: '',
  },
  footer: {
    tagline: '',
  },
  hero: {
    badge: 'Documents & identity',
    title: ['A calm studio for', 'PDFs and public profiles.'],
    description:
      'Share polished PDF resources and profile pages in one refined experience—without listings, classifieds, or noisy social feeds.',
    primaryCta: {
      label: 'Browse PDF library',
      href: '/pdf',
    },
    secondaryCta: {
      label: 'View profiles',
      href: '/profile',
    },
    searchPlaceholder: 'Search PDFs, profiles, and resources',
    focusLabel: 'Focus',
    featureCardBadge: 'Curated surfaces',
    featureCardTitle: 'PDFs and profiles stay at the center of the homepage.',
    featureCardDescription:
      'Downloads and identity pages share the same visual language so visitors always know where to look next.',
  },
  home: {
    metadata: {
      title: 'PDF library and professional profiles',
      description:
        'Studiodiamond is a PDF and profile platform for structured publishing, calm discovery, and trustworthy presentation.',
      openGraphTitle: 'PDF library and professional profiles',
      openGraphDescription:
        'Explore downloadable PDFs and public profiles through a warm, editorial layout built for clarity.',
      keywords: ['PDF library', 'professional profiles', 'document publishing', 'Studiodiamond'],
    },
    introBadge: 'About the studio',
    introTitle: 'Built for documents people keep, and profiles people trust.',
    introParagraphs: [
      'Studiodiamond focuses on two surfaces: structured PDFs your audience can save, and profile pages that introduce people and brands with confidence.',
      'The interface borrows the rhythm of a luxury editorial site—cream fields, bronze accents, and typography that feels deliberate rather than busy.',
      'You will not find business listings, classifieds, articles, image feeds, or social bookmarking here; the product stays narrow so the experience stays calm.',
    ],
    sideBadge: 'At a glance',
    sidePoints: [
      'PDF-first lanes with readable previews and obvious download paths.',
      'Profile cards that foreground names, roles, and supporting media.',
      'Navigation trimmed to Home, About, PDF Library, Profiles, and Contact.',
      'Light motion and generous spacing so browsing never feels rushed.',
    ],
    primaryLink: {
      label: 'Open PDF library',
      href: '/pdf',
    },
    secondaryLink: {
      label: 'Meet our profiles',
      href: '/profile',
    },
  },
  cta: {
    badge: 'Start with clarity',
    title: 'Bring your PDFs and profiles together in one composed experience.',
    description:
      'Whether you are publishing a catalog, onboarding pack, or leadership bio, Studiodiamond keeps the presentation consistent end to end.',
    primaryCta: {
      label: 'Explore PDFs',
      href: '/pdf',
    },
    secondaryCta: {
      label: 'Browse profiles',
      href: '/profile',
    },
  },
  luxuryHome: {
    heroEyebrow: 'Hi, we are your PDF & profile partner.',
    heroTitle: 'International-style publishing for PDFs and profiles.',
    heroDescription:
      'A warm, editorial layout for downloadable documents and public profiles—crafted so visitors feel guided, not overwhelmed.',
    stats: [
      { num: '850+', label: 'PDF resources hosted' },
      { num: '320+', label: 'Public profiles live' },
      { num: '140+', label: 'Curated collections' },
      { num: '96+', label: 'Cities represented' },
    ],
    introEyebrow: 'Exclusive service for you',
    introTitle: 'Structured PDFs meet polished profile pages.',
    introCopy: [
      'Give people a single place to download essentials and understand who stands behind them.',
      'Layouts borrow the calm rhythm of luxury editorial sites: generous space, warm neutrals, and typography that feels intentional.',
    ],
    servicesTitle: 'Let’s plan your next touchpoint together',
    services: [
      {
        title: 'Full PDF library',
        body: 'Curate multi-page documents, guides, and packs with readable previews.',
        href: '/pdf',
      },
      {
        title: 'Profile studio',
        body: 'Present bios, credentials, and media in a profile that feels bespoke.',
        href: '/profile',
        highlight: true,
      },
      {
        title: 'Concierge publishing',
        body: 'Keep new uploads and profile edits aligned with a predictable rhythm.',
        href: '/contact',
      },
    ],
    projectsTitle: 'Our latest projects',
    testimonial:
      'Studiodiamond gave us one elegant surface for spec PDFs and leadership profiles. Clients finally stop hunting through old inboxes.',
    testimonialBy: 'Jordan M., Studio lead',
  },
  taskSectionHeading: 'Latest {label}',
  taskSectionDescriptionSuffix: 'Browse the newest posts in this section.',
} as const

export const taskPageMetadata: Record<Exclude<TaskKey, 'comment' | 'org' | 'social'>, { title: string; description: string }> = {
  article: {
    title: 'Articles and stories',
    description: 'A PDF site for studiodiamong, built for clean discovery and structured publishing.',
  },
  listing: {
    title: 'Listings and discoverable pages',
    description: 'A PDF site for studiodiamong, built for clean discovery and structured publishing.',
  },
  classified: {
    title: 'Classifieds and announcements',
    description: 'A PDF site for studiodiamong, built for clean discovery and structured publishing.',
  },
  image: {
    title: 'Images and visual posts',
    description: 'A PDF site for studiodiamong, built for clean discovery and structured publishing.',
  },
  profile: {
    title: 'Profiles and public pages',
    description: 'A PDF site for studiodiamong, built for clean discovery and structured publishing.',
  },
  sbm: {
    title: 'Curated links and saved resources',
    description: 'A PDF site for studiodiamong, built for clean discovery and structured publishing.',
  },
  pdf: {
    title: 'PDFs and downloadable resources',
    description: 'A PDF site for studiodiamong, built for clean discovery and structured publishing.',
  },
}

export const taskIntroCopy: Record<
  TaskKey,
  { title: string; paragraphs: string[]; links: { label: string; href: string }[] }
> = {
  listing: {
    title: 'Listings, services, and structured pages',
    paragraphs: [
      'Explore listings, services, brands, and discoverable pages across categories. Each entry is organized to make browsing clearer and help visitors quickly understand what a post offers.',
      'Listings connect naturally with articles, images, resources, and other content types so supporting information stays easy to reach from the same platform.',
      'Browse by category to compare posts in context, discover related content, and move between formats without losing your place.',
    ],
    links: [
      { label: 'Read articles', href: '/articles' },
      { label: 'Explore classifieds', href: '/classifieds' },
      { label: 'View profiles', href: '/profile' },
    ],
  },
  article: {
    title: 'Articles, stories, and long-form reading',
    paragraphs: [
      'This section is built for stories, explainers, guides, and long-form reading across topics and interests.',
      'Articles connect with listings, images, resources, and other content types so deeper reading can lead naturally into related discovery.',
      'Use this section to browse thoughtful posts, revisit useful writing, and move into supporting content when you want more context.',
    ],
    links: [
      { label: 'Explore listings', href: '/listings' },
      { label: 'Open images', href: '/images' },
      { label: 'Browse resources', href: '/pdf' },
    ],
  },
  classified: {
    title: 'Classifieds, offers, and timely updates',
    paragraphs: [
      'Classified posts help surface offers, notices, deals, and time-sensitive opportunities in a faster-scanning format.',
      'They work well alongside articles, listings, and profiles, making it easier to connect short-term posts with more structured content.',
      'Browse by category to find announcements quickly, then continue into related sections when you need more detail.',
    ],
    links: [
      { label: 'Business listings', href: '/listings' },
      { label: 'Read articles', href: '/articles' },
      { label: 'View profiles', href: '/profile' },
    ],
  },
  image: {
    title: 'Image-led posts and visual stories',
    paragraphs: [
      'Images take the lead in this section through galleries, visual posts, and story-led content where imagery carries the experience.',
      'These posts connect with articles, listings, and other sections so visuals can act as entry points into deeper content.',
      'Browse the latest visual updates, then continue into related stories or supporting pages for more context.',
    ],
    links: [
      { label: 'Read articles', href: '/articles' },
      { label: 'Explore listings', href: '/listings' },
      { label: 'Open classifieds', href: '/classifieds' },
    ],
  },
  profile: {
    title: 'Profiles, identities, and public pages',
    paragraphs: [
      'Profiles capture the identity behind a business, creator, brand, or project and help visitors understand who is behind the content they are exploring.',
      'These pages work as trust anchors across the site and connect naturally with stories, listings, documents, and other post types.',
      'Browse profiles to understand people and brands more clearly, then continue into related content from the same source.',
    ],
    links: [
      { label: 'Open listings', href: '/listings' },
      { label: 'Read articles', href: '/articles' },
      { label: 'Browse images', href: '/images' },
    ],
  },
  sbm: {
    title: 'Curated links and bookmarked resources',
    paragraphs: [
      'This section collects useful links, references, tools, and saved resources in a text-first browsing format.',
      'Bookmarks stay connected to the rest of the platform, making it easier to move from a saved link into related stories, listings, or resources.',
      'Use this section to organize helpful sources and discover connected content without leaving the broader site experience.',
    ],
    links: [
      { label: 'Browse articles', href: '/articles' },
      { label: 'Explore listings', href: '/listings' },
      { label: 'Open PDFs', href: '/pdf' },
    ],
  },
  pdf: {
    title: 'PDFs, documents, and downloadable files',
    paragraphs: [
      'The PDF library hosts reports, guides, downloadable files, and longer-form document resources that support reading and discovery.',
      'These resources work alongside stories, listings, and profiles, helping document-style content stay connected to the rest of the platform.',
      'Browse by category to find relevant files quickly, then continue into related sections when you want more context.',
    ],
    links: [
      { label: 'Read articles', href: '/articles' },
      { label: 'See listings', href: '/listings' },
      { label: 'Explore profiles', href: '/profile' },
    ],
  },
  social: {
    title: 'Short updates and community signals',
    paragraphs: [
      'Short updates add quick signals that keep activity flowing across the platform.',
      'They work well with stories, listings, and resources by helping visitors move from brief updates into deeper content.',
      'Use these posts as lightweight entry points into the broader site experience.',
    ],
    links: [
      { label: 'Open listings', href: '/listings' },
      { label: 'Read articles', href: '/articles' },
      { label: 'View PDFs', href: '/pdf' },
    ],
  },
  comment: {
    title: 'Comments and contextual responses',
    paragraphs: [
      'Comments surface responses connected directly to articles and help keep discussion close to the writing it belongs to.',
      'This layer adds perspective and reaction without needing a separate standalone content format.',
      'Use comments as supporting context beneath stories, then continue exploring related content from the same topic area.',
    ],
    links: [
      { label: 'Explore articles', href: '/articles' },
      { label: 'View listings', href: '/listings' },
      { label: 'See classifieds', href: '/classifieds' },
    ],
  },
  org: {
    title: 'Organizations, teams, and structured entities',
    paragraphs: [
      'Organization pages provide structured identity surfaces for teams, brands, communities, and agencies.',
      'Used with listings, stories, profiles, and resources, they help create stronger structure across the platform.',
      'Connect organization pages with related content to build a clearer and more unified site presence.',
    ],
    links: [
      { label: 'Business listings', href: '/listings' },
      { label: 'Read articles', href: '/articles' },
      { label: 'PDF library', href: '/pdf' },
    ],
  },
}
