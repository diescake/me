import type { FunctionComponent } from 'react'
import Image from 'next/image'
import { ExternalLinkIcon } from '@/components/ExternalLinkIcon'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'diescake.com - Software Engineer',
  description:
    'Software Engineer passionate about web development and building great user experiences.',
  openGraph: {
    title: 'diescake.com - Software Engineer',
    description:
      'Software Engineer passionate about web development and building great user experiences.',
    url: 'https://diescake.com',
    siteName: 'diescake.com',
    images: [
      {
        url: `https://diescake.com/api/og?title=diescake.com`,
        width: 1200,
        height: 630,
      },
    ],
    locale: 'ja_JP',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'diescake.com - Software Engineer',
    description:
      'Software Engineer passionate about web development and building great user experiences.',
    creator: '@diescake',
  },
}

export default function Home(): ReturnType<FunctionComponent> {
  return (
    <main className="h-[calc(100vh-73px)] flex flex-col items-center justify-center p-6 bg-zinc-900">
      <div className="max-w-2xl w-full space-y-8">
        <section className="flex flex-col md:flex-row items-center gap-8">
          <div className="w-48 h-48 relative rounded-full overflow-hidden border-4 border-gray-100 shadow-lg">
            <Image
              src="/diescake-icon.jpg"
              alt="diescake profile"
              fill
              sizes="(max-width: 768px) 192px, 192px"
              className="object-cover"
              priority
            />
          </div>
          <div className="flex-1 text-center md:text-left">
            <h1 className="text-4xl font-bold mb-4 text-white">diescake</h1>
            <p className="text-lg text-gray-300 mb-6">
              Software Engineer passionate about web development and building
              great user experiences. Currently working on various projects
              using React, Next.js, and TypeScript.
            </p>
            <p className="text-sm text-gray-400 mt-8 italic border-t border-zinc-800 pt-4 mb-4">
              これは{' '}
              <a
                href="https://github.com/cline/cline"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-gray-300 inline-flex items-center"
              >
                Cline
                <ExternalLinkIcon className="ml-0.5 w-3 h-3" />
              </a>
              で生成したポートフォリオ風のサイトです。Blogもすべて生成された記事です。
            </p>
            <a
              href="https://github.com/diescake/me"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-gray-300 inline-flex items-center"
            >
              GitHub Repository
              <ExternalLinkIcon className="ml-0.5 w-3 h-3" />
            </a>
          </div>
        </section>
      </div>
    </main>
  )
}
