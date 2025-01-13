import Link from 'next/link'
import type { FunctionComponent } from 'react'

export default function Home(): ReturnType<FunctionComponent> {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-4">
      <h1 className="text-4xl font-bold mb-8">Welcome to My Website</h1>
      <Link
        href="/blog"
        className="text-lg px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
      >
        Visit Blog
      </Link>
    </main>
  )
}
