'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Body from './components/Body'

export default function Home(): JSX.Element {
  const router = useRouter()

  useEffect(() => {
    try {
      router.push('/product')
    } catch (error) {
      alert('Something wrong with home page!')
    }
  }, [router])

  return (
    <main className="dark:bg-gray-900 dark:text-white">
      <Body />
    </main>
  )
}
