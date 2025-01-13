import Link from 'next/link'
import { getAllPosts } from '@/lib/blog'

export default function BlogList() {
  const posts = getAllPosts()

  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-8">Blog Posts</h1>
      <div className="space-y-8">
        {posts.map((post) => (
          <article
            key={post.id}
            className="border rounded-lg p-6 hover:shadow-lg transition-shadow"
          >
            <Link href={`/blog/${post.id}`} className="space-y-2 block">
              <h2 className="text-2xl font-semibold hover:text-blue-600">
                {post.title}
              </h2>
              <div className="text-gray-600">{post.date}</div>
              <p className="text-gray-700">{post.description}</p>
              <div className="text-blue-600 hover:underline">Read more →</div>
            </Link>
          </article>
        ))}
      </div>
    </div>
  )
}

export const generateStaticParams = async () => {
  return []
}
