import Link from 'next/link'
import type { FunctionComponent } from 'react'
import { getPaginatedPosts } from '@/lib/blog'

export const revalidate = 3600 // 1時間ごとに再生成

type PageProps = {
  searchParams: Promise<{ page?: string }>
}

export default async function BlogList({
  searchParams,
}: PageProps): Promise<ReturnType<FunctionComponent>> {
  const resolvedSearchParams = await searchParams
  const currentPage = Number(resolvedSearchParams.page) || 1
  const { posts, totalPages } = getPaginatedPosts(currentPage)

  return (
    <div className="max-w-4xl mx-auto py-12 px-6 space-y-12">
      <h1 className="text-4xl font-bold mb-12 text-gray-100 tracking-tight">
        Blog Posts
      </h1>
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

      {/* Pagination */}
      <div className="flex justify-center space-x-4">
        {currentPage > 1 && (
          <Link
            href={`/blog?page=${currentPage - 1}`}
            className="px-4 py-2 text-sm font-medium text-blue-400 bg-blue-900/50 rounded-lg hover:bg-blue-900/70 transition-colors"
          >
            Previous
          </Link>
        )}
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <Link
            key={page}
            href={`/blog?page=${page}`}
            className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
              currentPage === page
                ? 'bg-blue-400 text-gray-900'
                : 'text-blue-400 bg-blue-900/50 hover:bg-blue-900/70'
            }`}
          >
            {page}
          </Link>
        ))}
        {currentPage < totalPages && (
          <Link
            href={`/blog?page=${currentPage + 1}`}
            className="px-4 py-2 text-sm font-medium text-blue-400 bg-blue-900/50 rounded-lg hover:bg-blue-900/70 transition-colors"
          >
            Next
          </Link>
        )}
      </div>
    </div>
  )
}

export const generateStaticParams = async (): Promise<[]> => {
  return []
}
