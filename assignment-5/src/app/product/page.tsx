'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Body from '../components/Body'

export default function ProductPage(): React.JSX.Element {
  const router = useRouter()

  useEffect(() => {
    const loginStr: string | null = localStorage.getItem('login')
    if (loginStr === null) router.replace('/login')
    else router.replace('?q=&page=1')
  }, [router])

  return (
    <main className="dark:bg-gray-900 dark:text-white">
      <Body />
    </main>
  )
}
