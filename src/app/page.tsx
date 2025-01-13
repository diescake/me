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
      </div>
    </main>
  )
}
