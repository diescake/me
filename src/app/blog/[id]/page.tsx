import { getAllPostIds, getPostData } from '@/lib/blog'
import Link from 'next/link'
import { Metadata } from 'next'

type GenerateMetadataProps = {
  params: { id: string }
}

export async function generateMetadata({
  params,
}: GenerateMetadataProps): Promise<Metadata> {
  const post = await getPostData(params.id)
  return {
    title: post.title,
    description: post.description,
  }
}

type PageProps = {
  params: { id: string }
}

export default async function BlogPost({ params }: PageProps) {
  const post = await getPostData(params.id)

  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      <Link href="/blog" className="text-blue-600 hover:underline mb-8 block">
        ← Back to blog
      </Link>
      <article className="prose prose-lg max-w-none">
        <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
        <div className="text-gray-600 mb-8">{post.date}</div>
        <div
          dangerouslySetInnerHTML={{ __html: post.content }}
          className="prose-pre:bg-gray-100 prose-pre:p-4 prose-pre:rounded-lg"
        />
      </article>
    </div>
  )
}

export async function generateStaticParams() {
  const ids = getAllPostIds()
  return ids.map((id) => ({
    id,
  }))
}
