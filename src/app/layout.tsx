import type { Metadata } from 'next'
import type { FunctionComponent } from 'react'
import { Inter } from 'next/font/google'
import Link from 'next/link'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Generated site by Cline',
  description: 'A blog built with Next.js and Markdown by Cline',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}): ReturnType<FunctionComponent> {
  return (
    <html lang="en">
      <body className={inter.className}>
        <header className="bg-white shadow-sm">
          <nav className="max-w-4xl mx-auto px-4 py-4 flex justify-between items-center">
            <Link
              href="/"
              className="text-xl font-bold text-gray-900 hover:text-blue-600"
            >
              diescake
            </Link>
            <div className="space-x-6">
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
            </div>
          </nav>
        </header>
        <main>{children}</main>
        <footer className="bg-gray-50 mt-8">
          <div className="max-w-4xl mx-auto px-4 py-8 text-center text-gray-600">
            Built with Next.js and Markdown
          </div>
        </footer>
      </body>
    </html>
  )
}
