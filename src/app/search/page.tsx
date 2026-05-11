import { PageShell } from '@/components/shared/page-shell'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Search } from 'lucide-react'
import { fetchSiteFeed } from '@/lib/site-connector'
import { buildPostUrl, getPostTaskKey } from '@/lib/task-data'
import { getMockPostsForTask } from '@/lib/mock-posts'
import { SITE_CONFIG } from '@/lib/site-config'
import { TaskPostCard } from '@/components/shared/task-post-card'
import { luxe } from '@/components/shared/luxe-styles'

export const revalidate = 3

const matchText = (value: string, query: string) => value.toLowerCase().includes(query)

const stripHtml = (value: string) => value.replace(/<[^>]*>/g, ' ')

const compactText = (value: unknown) => {
  if (typeof value !== 'string') return ''
  return stripHtml(value).replace(/\s+/g, ' ').trim().toLowerCase()
}

export default async function SearchPage({
  searchParams,
}: {
  searchParams?: Promise<{ q?: string; category?: string; task?: string; master?: string }>
}) {
  const resolved = (await searchParams) || {}
  const query = (resolved.q || '').trim()
  const normalized = query.toLowerCase()
  const category = resolved.category ? resolved.category.trim().toLowerCase() : ''
  const task = (resolved.task || '').trim().toLowerCase()
  const useMaster = resolved.master !== '0'
  const feed = await fetchSiteFeed(
    useMaster ? 1000 : 300,
    useMaster ? { fresh: true, category: category || undefined, task: task || undefined } : undefined
  )
  const posts = feed?.posts?.length
    ? feed.posts
    : useMaster
      ? []
      : SITE_CONFIG.tasks.flatMap((t) => getMockPostsForTask(t.key))

  const filtered = posts.filter((post) => {
    const content = post.content && typeof post.content === 'object' ? post.content : {}
    const typeText = compactText((content as { type?: string }).type)
    if (typeText === 'comment') return false
    const description = compactText((content as { description?: string }).description)
    const body = compactText((content as { body?: string }).body)
    const excerpt = compactText((content as { excerpt?: string }).excerpt)
    const categoryText = compactText((content as { category?: string }).category)
    const tags = Array.isArray(post.tags) ? post.tags.join(' ') : ''
    const tagsText = compactText(tags)
    const derivedCategory = categoryText || tagsText
    if (category && !derivedCategory.includes(category)) return false
    if (task && typeText && typeText !== task) return false
    if (!normalized.length) return true
    return (
      matchText(compactText(post.title || ''), normalized) ||
      matchText(compactText(post.summary || ''), normalized) ||
      matchText(description, normalized) ||
      matchText(body, normalized) ||
      matchText(excerpt, normalized) ||
      matchText(tagsText, normalized)
    )
  })

  const results = normalized.length > 0 ? filtered : filtered.slice(0, 24)

  return (
    <PageShell
      title="Search"
      description={
        query
          ? `Results for “${query}” across PDFs, profiles, and linked resources.`
          : 'Browse the latest PDFs and profiles with the same cream-and-bronze rhythm as the homepage.'
      }
      actions={
        <form action="/search" className="flex w-full flex-col gap-2 sm:w-auto sm:flex-row">
          <input type="hidden" name="master" value="1" />
          {category ? <input type="hidden" name="category" value={category} /> : null}
          {task ? <input type="hidden" name="task" value={task} /> : null}
          <div className="relative w-full sm:w-80">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#A98E7B]" />
            <Input
              name="q"
              defaultValue={query}
              placeholder="Search PDFs, profiles, collections…"
              className="h-11 border-[#e5d9cf] bg-white pl-9 text-[#2a211c] placeholder:text-[#9a8578]"
            />
          </div>
          <Button type="submit" className="h-11 bg-[#A98E7B] text-white hover:bg-[#957a68]">
            Search
          </Button>
        </form>
      }
    >
      {results.length ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {results.map((post) => {
            const tk = getPostTaskKey(post)
            const href = tk ? buildPostUrl(tk, post.slug) : `/posts/${post.slug}`
            return <TaskPostCard key={post.id} post={post} href={href} />
          })}
        </div>
      ) : (
        <div className={`${luxe.dashed} p-12 text-center`}>
          <p className={`text-sm font-medium ${luxe.ink}`}>No matching posts yet</p>
          <p className={`mt-2 text-sm ${luxe.muted}`}>
            Try another keyword, or browse the PDF library and profile directory directly from the navigation bar.
          </p>
        </div>
      )}
    </PageShell>
  )
}
