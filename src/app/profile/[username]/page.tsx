import Link from "next/link";
import { notFound } from "next/navigation";
import { Footer } from "@/components/shared/footer";
import { NavbarShell } from "@/components/shared/navbar-shell";
import { ContentImage } from "@/components/shared/content-image";
import { TaskPostCard } from "@/components/shared/task-post-card";
import { Button } from "@/components/ui/button";
import { ProfileSidebarEnhanced } from "@/components/profile/profile-sidebar-enhanced";
import { SchemaJsonLd } from "@/components/seo/schema-jsonld";
import { buildPostUrl } from "@/lib/task-data";
import { buildPostMetadata, buildTaskMetadata } from "@/lib/seo";
import { fetchTaskPostBySlug, fetchTaskPosts } from "@/lib/task-data";
import { SITE_CONFIG } from "@/lib/site-config";

export const revalidate = 3;

const escapeHtml = (value: string) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");

const sanitizeRichHtml = (html: string) =>
  html
    .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, "")
    .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, "")
    .replace(/<iframe[^>]*>[\s\S]*?<\/iframe>/gi, "")
    .replace(/<object[^>]*>[\s\S]*?<\/object>/gi, "")
    .replace(/\son[a-z]+\s*=\s*(['"]).*?\1/gi, "")
    .replace(/\shref\s*=\s*(['"])javascript:.*?\1/gi, ' href="#"');

const formatRichHtml = (raw?: string | null, fallback = "Profile details will appear here once available.") => {
  const source = typeof raw === "string" ? raw.trim() : "";
  if (!source) return `<p>${escapeHtml(fallback)}</p>`;
  if (/<[a-z][\s\S]*>/i.test(source)) return sanitizeRichHtml(source);
  return source
    .split(/\n{2,}/)
    .map((paragraph) => `<p>${escapeHtml(paragraph.replace(/\n/g, " ").trim())}</p>`)
    .join("");
};

export async function generateStaticParams() {
  const posts = await fetchTaskPosts("profile", 50);
  if (!posts.length) {
    return [{ username: "placeholder" }];
  }
  return posts.map((post) => ({ username: post.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ username: string }> }) {
  const resolvedParams = await params;
  try {
    const post = await fetchTaskPostBySlug("profile", resolvedParams.username);
    return post ? await buildPostMetadata("profile", post) : await buildTaskMetadata("profile");
  } catch (error) {
    console.warn("Profile metadata lookup failed", error);
    return await buildTaskMetadata("profile");
  }
}

export default async function ProfileDetailPage({ params }: { params: Promise<{ username: string }> }) {
  const resolvedParams = await params;
  const post = await fetchTaskPostBySlug("profile", resolvedParams.username);
  if (!post) {
    notFound();
  }
  const content = (post.content || {}) as Record<string, any>;
  const logoUrl = typeof content.logo === "string" ? content.logo : undefined;
  const brandName =
    (content.brandName as string | undefined) ||
    (content.companyName as string | undefined) ||
    (content.name as string | undefined) ||
    post.title;
  const website = content.website as string | undefined;
  const domain = website ? website.replace(/^https?:\/\//, "").replace(/\/.*$/, "") : undefined;
  const description =
    (content.description as string | undefined) ||
    post.summary ||
    "Profile details will appear here once available.";
  const descriptionHtml = formatRichHtml(description);
  const suggestedArticles = await fetchTaskPosts("article", 6);
  const baseUrl = SITE_CONFIG.baseUrl.replace(/\/$/, "");
  const breadcrumbData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: baseUrl,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Profiles",
        item: `${baseUrl}/profile`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: brandName,
        item: `${baseUrl}/profile/${post.slug}`,
      },
    ],
  };

  return (
    <div className="min-h-screen bg-background">
      <NavbarShell />
      <main className="mx-auto w-full max-w-7xl px-4 pb-16 pt-10 sm:px-6 lg:px-8">
        <SchemaJsonLd data={breadcrumbData} />
        <div className="grid gap-8 lg:grid-cols-[280px_1fr]">
          {/* Left Sidebar */}
          <aside className="lg:sticky lg:top-24 lg:h-fit">
          <ProfileSidebarEnhanced
            brandName={brandName}
            logoUrl={logoUrl}
            fallbackText={post.title.slice(0, 1).toUpperCase()}
            profileUrl={typeof window !== 'undefined' ? window.location.href : ''}
          />
          </aside>

          {/* Main Content */}
          <div className="space-y-8">
            {/* Profile Section */}
            <section className="rounded-2xl border border-border/60 bg-white/90 p-8 shadow-sm">
              {/* About Section */}
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <h3 className="text-lg font-semibold text-foreground">about</h3>
                  <span className="text-red-500">♡</span>
                </div>
                <article
                  className="article-content prose prose-slate max-w-none text-base leading-relaxed prose-p:my-3 prose-a:text-primary prose-a:underline prose-strong:font-semibold"
                  dangerouslySetInnerHTML={{ __html: descriptionHtml }}
                />
              </div>
              
              {/* Website Link */}
              {website ? (
                <div className="mt-6">
                  <Button asChild variant="outline" className="px-6">
                    <Link href={website} target="_blank" rel="noopener noreferrer">
                      Visit Official Site
                    </Link>
                  </Button>
                </div>
              ) : null}
            </section>

            {/* Suggested Articles Section */}
            {suggestedArticles.length ? (
              <section>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold text-foreground">Suggested articles</h2>
                  <Link href="/articles" className="text-sm font-medium text-primary hover:underline">
                    View all
                  </Link>
                </div>
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-6">
                  {suggestedArticles.slice(0, 3).map((article) => (
                    <TaskPostCard
                      key={article.id}
                      post={article}
                      href={buildPostUrl("article", article.slug)}
                      compact
                    />
                  ))}
                </div>
                <nav className="rounded-2xl border border-border bg-card/60 p-4">
                  <p className="text-sm font-semibold text-foreground">Related links</p>
                  <ul className="mt-2 space-y-2 text-sm">
                    {suggestedArticles.slice(0, 3).map((article) => (
                      <li key={`related-${article.id}`}>
                        <Link
                          href={buildPostUrl("article", article.slug)}
                          className="text-primary underline-offset-4 hover:underline"
                        >
                          {article.title}
                        </Link>
                      </li>
                    ))}
                    <li>
                      <Link href="/profile" className="text-primary underline-offset-4 hover:underline">
                        Browse all profiles
                      </Link>
                    </li>
                  </ul>
                </nav>
              </section>
            ) : null}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
