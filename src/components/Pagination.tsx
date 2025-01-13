'use client'

import Link from 'next/link'
import { ReactElement } from 'react'

type PaginationProps = {
  currentPage: number
  totalPages: number
}

export default function Pagination({
  currentPage,
  totalPages,
}: PaginationProps): ReactElement {
  return (
    <div className="flex justify-center space-x-4">
      <Link
        href={currentPage > 1 ? `/blog?page=${currentPage - 1}` : '#'}
        className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
          currentPage > 1
            ? 'text-blue-400 bg-blue-900/50 hover:bg-blue-900/70'
            : 'text-gray-500 bg-gray-800/50 cursor-not-allowed'
        }`}
        onClick={(e) => {
          if (currentPage <= 1) e.preventDefault()
        }}
      >
        Previous
      </Link>
      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
        <Link
          key={page}
          href={`/blog?page=${page}`}
          className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
            currentPage === page
              ? 'bg-blue-400 text-gray-900'
              : 'text-blue-400 bg-blue-900/50 hover:bg-blue-900/70'
          }`}
        >
          {page}
        </Link>
      ))}
      <Link
        href={currentPage < totalPages ? `/blog?page=${currentPage + 1}` : '#'}
        className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
          currentPage < totalPages
            ? 'text-blue-400 bg-blue-900/50 hover:bg-blue-900/70'
            : 'text-gray-500 bg-gray-800/50 cursor-not-allowed'
        }`}
        onClick={(e) => {
          if (currentPage >= totalPages) e.preventDefault()
        }}
      >
        Next
      </Link>
    </div>
  )
}
