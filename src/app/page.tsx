import Link from 'next/link'
import type { FunctionComponent } from 'react'

export default function Home(): ReturnType<FunctionComponent> {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-8">
      <div className="max-w-2xl w-full space-y-8">
        <section className="text-center">
          <h1 className="text-4xl font-bold mb-4">diescake</h1>
          <p className="text-lg text-gray-600 mb-6">
            Software Engineer passionate about web development and building
            great user experiences. Currently working on various projects using
            React, Next.js, and TypeScript.
          </p>
        </section>

        <section className="flex justify-center space-x-4">
          <Link
            href="https://x.com/diescake"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-600 hover:text-blue-600 transition-colors"
          >
            X.com
          </Link>
          <Link
            href="https://github.com/diescake"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-600 hover:text-blue-600 transition-colors"
          >
            GitHub
          </Link>
          <Link
            href="/blog"
            className="text-gray-600 hover:text-blue-600 transition-colors"
          >
            Blog
          </Link>
        </section>
      </div>
    </main>
  )
}
