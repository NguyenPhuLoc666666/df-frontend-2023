'use client'
import React, { useEffect, useState } from 'react'
import Header from './components/Header'
import Body from './components/Body'
import Footer from './components/Footer'

export default function Home() {
  const [theme, setTheme] = useState(() => {
    let savedDarkMode: string | null = null
    if (typeof window !== 'undefined') {
      savedDarkMode = localStorage.getItem('theme')
    }
    return savedDarkMode === 'dark' ? 'dark' : 'light'
  })

  useEffect(() => {
    localStorage.setItem('theme', JSON.stringify(theme))
    document.body.classList.toggle('dark', theme === 'dark')
  }, [theme])

  useEffect(() => {
    if (window.matchMedia('prefers-color-scheme: dark').matches) {
      setTheme('dark')
    }
  }, [])

  return (
    <main className="flex relative min-h-screen flex-col p-0 m-0 pb-14">
      <Header theme={theme} setTheme={setTheme} />
      <Body />
      <Footer />
    </main>
  )
}
