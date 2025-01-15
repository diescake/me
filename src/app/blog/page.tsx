import Link from 'next/link'
import type { FunctionComponent } from 'react'
import { getPaginatedPosts } from '@/lib/blog'
import Pagination from '@/components/Pagination'
import SearchBar from '@/components/SearchBar'
import { Metadata } from 'next'

export const revalidate = 3600 // 1時間ごとに再生成

export const metadata: Metadata = {
  title: 'Blog - diescake.com',
  description:
    'Technical blog posts about web development, programming, and more.',
  openGraph: {
    title: 'Blog - diescake.com',
    description:
      'Technical blog posts about web development, programming, and more.',
    url: 'https://diescake.com/blog',
    siteName: 'diescake.com',
    images: [
      {
        url: `https://diescake.com/api/og?title=Blog - diescake.com`,
        width: 1200,
        height: 630,
      },
    ],
    locale: 'ja_JP',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Blog - diescake.com',
    description:
      'Technical blog posts about web development, programming, and more.',
    creator: '@diescake',
  },
}

type PageProps = {
  searchParams: Promise<{ page?: string; q?: string }>
}

export default async function BlogList({
  searchParams,
}: PageProps): Promise<ReturnType<FunctionComponent>> {
  const resolvedSearchParams = await searchParams
  const currentPage = Number(resolvedSearchParams.page) || 1
  const searchQuery = resolvedSearchParams.q
  const { posts, totalPages } = getPaginatedPosts(currentPage, 10, searchQuery)

  return (
    <div className="max-w-4xl mx-auto py-12 px-6 space-y-12">
      <h1 className="text-4xl font-bold mb-8 text-gray-100 tracking-tight">
        Blog Posts
      </h1>
      <SearchBar />
      <div className="space-y-6">
        {posts.map((post) => (
          <article
            key={post.id}
            className="border border-gray-800 rounded-xl p-6 hover:shadow-xl hover:border-gray-700 transition-all duration-300 bg-gray-900"
          >
            <Link href={`/blog/${post.id}`} className="space-y-3 block">
              <div className="inline-block px-3 py-1 text-sm font-medium text-blue-400 bg-blue-900/50 rounded-full mb-2">
                {post.date}
              </div>
              <h2 className="text-2xl font-semibold text-gray-100 hover:text-blue-400 transition-colors duration-200">
                {post.title}
              </h2>
              <p className="text-gray-400 leading-relaxed">
                {post.description}
              </p>
              <div className="text-blue-400 font-medium group flex items-center">
                Read more
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform duration-200"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </div>
            </Link>
          </article>
        ))}
      </div>

      <Pagination currentPage={currentPage} totalPages={totalPages} />
    </div>
  )
}

export const generateStaticParams = async (): Promise<[]> => {
  return []
}
