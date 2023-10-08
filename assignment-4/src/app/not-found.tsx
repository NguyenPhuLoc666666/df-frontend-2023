import Link from 'next/link'
import React from 'react'

export default function NotFound() {
  return (
    <main className="text-center dark:bg-gray-900 dark:text-white w-full min-h-full">
      <div className="m-auto relative top-24">
        <h1 className="text-3xl">404</h1>
        <h2>Page not found</h2>
        <p>
          Go back to{' '}
          <Link href="/products">
            <span className="underline">HomePage</span>
          </Link>
        </p>
      </div>
    </main>
  )
}
