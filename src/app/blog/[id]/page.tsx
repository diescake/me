import { getAllPostIds, getPostData } from '@/lib/blog'
import type { FunctionComponent } from 'react'
export const revalidate = 3600 // 1時間ごとに再生成
import Link from 'next/link'
import { Metadata } from 'next'

type GenerateMetadataProps = {
  params: Promise<{ id: string }>
}

export async function generateMetadata({
  params,
}: GenerateMetadataProps): Promise<Metadata> {
  const resolvedParams = await params
  const post = await getPostData(resolvedParams.id)
  return {
    title: post.title,
    description: post.description,
  }
}

type PageProps = {
  params: Promise<{ id: string }>
}

export default async function BlogPost({
  params,
}: PageProps): Promise<ReturnType<FunctionComponent>> {
  const resolvedParams = await params
  const post = await getPostData(resolvedParams.id)

  return (
    <div className="max-w-4xl mx-auto py-12 px-6">
      <Link
        href="/blog"
        className="inline-flex items-center text-blue-400 hover:text-blue-300 transition-colors duration-200 mb-12 group"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 mr-2 group-hover:-translate-x-1 transition-transform duration-200"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 19l-7-7 7-7"
          />
        </svg>
        Back to blog
      </Link>
      <article className="prose prose-lg max-w-none prose-invert">
        <h1 className="text-4xl font-bold mb-4 text-gray-100 tracking-tight">
          {post.title}
        </h1>
        <div className="inline-block px-3 py-1 text-sm font-medium text-blue-400 bg-blue-900/50 rounded-full mb-8">
          {post.date}
        </div>
        <div
          dangerouslySetInnerHTML={{ __html: post.content }}
          className="prose-headings:text-gray-100 prose-headings:font-semibold prose-p:text-gray-300 prose-p:leading-relaxed prose-a:text-blue-400 prose-a:no-underline hover:prose-a:underline prose-pre:bg-gray-800 prose-pre:p-4 prose-pre:rounded-xl prose-pre:border prose-pre:border-gray-700"
        />
      </article>
    </div>
  )
}

type StaticParams = {
  id: string
}

export async function generateStaticParams(): Promise<StaticParams[]> {
  const ids = getAllPostIds()
  return ids.map((id) => ({
    id,
  }))
}
