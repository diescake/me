import { getAllPostIds, getPostData } from '@/lib/blog'
import { addExternalLinkIcons } from '@/lib/external-links'
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
    openGraph: {
      title: post.title,
      description: post.description,
      url: `https://diescake.com/blog/${resolvedParams.id}`,
      siteName: 'diescake.com',
      images: [
        {
          url: `https://diescake.com/api/og?title=${encodeURIComponent(post.title)}`,
          width: 1200,
          height: 630,
        },
      ],
      locale: 'ja_JP',
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.description,
      creator: '@diescake',
    },
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
        <h1 className="text-5xl font-bold mb-6 text-gray-100 tracking-tight leading-tight">
          {post.title}
        </h1>
        <div className="inline-block px-3 py-1 text-sm font-medium text-blue-400 bg-blue-900/50 rounded-full mb-12">
          {post.date}
        </div>
        <div
          dangerouslySetInnerHTML={{
            __html: addExternalLinkIcons(post.content),
          }}
          className="[&>h1]:hidden prose-h2:text-gray-100 prose-h2:font-semibold prose-h2:text-3xl prose-h3:text-gray-100 prose-h3:font-semibold prose-h3:text-2xl prose-h4:text-gray-100 prose-h4:font-semibold prose-h4:text-xl prose-p:text-gray-300 prose-p:leading-relaxed prose-a:text-blue-400 prose-a:no-underline hover:prose-a:underline prose-pre:bg-gray-800 prose-pre:p-4 prose-pre:rounded-xl prose-pre:border prose-pre:border-gray-700 [&_.external-link-icon]:relative [&_.external-link-icon]:after:content-[''] [&_.external-link-icon]:after:absolute [&_.external-link-icon]:after:w-4 [&_.external-link-icon]:after:h-4 [&_.external-link-icon]:after:bg-[url('/globe.svg')] [&_.external-link-icon]:after:bg-contain [&_.external-link-icon]:after:bg-no-repeat [&_.external-link-icon]:after:ml-1 [&_.external-link-icon]:after:inline-block"
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
