import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Link from 'next/link'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'My Blog',
  description: 'A blog built with Next.js and Markdown',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <header className="bg-white shadow-sm">
          <nav className="max-w-4xl mx-auto px-4 py-4">
            <Link
              href="/blog"
              className="text-xl font-bold text-gray-900 hover:text-blue-600"
            >
              My Blog
            </Link>
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
