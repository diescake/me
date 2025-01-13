import type { FunctionComponent } from 'react'
import { ExternalLinkIcon } from '@/components/ExternalLinkIcon'

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
          <p className="text-sm text-gray-400 mt-8 italic border-t border-gray-200 pt-4">
            これは{' '}
            <a
              href="https://github.com/cline/cline"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-500 hover:text-gray-600 inline-flex items-center"
            >
              Cline
              <ExternalLinkIcon className="ml-0.5 w-3 h-3" />
            </a>
            で生成したポートフォリオ風のサイトです。Blogもすべて生成された記事です。
          </p>
        </section>
      </div>
    </main>
  )
}
