import React, { type FC, useEffect, useState } from 'react'
import './App.css'
import Header from './components/Header'
import Body from './components/Body'
import Footer from './components/Footer'

const App: FC = () => {
  const [darkMode, setDarkMode] = useState(() => {
    const savedDarkMode = localStorage.getItem('darkMode')
    return savedDarkMode === 'true'
  })

  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(darkMode))
    document.body.classList.toggle('dark-mode', darkMode)
  }, [darkMode])

  return (
    <div className="container">
      <Header darkMode={darkMode} setDarkMode={setDarkMode} />
      <Body darkMode={darkMode} />
      <Footer darkMode={darkMode} />
    </div>
  )
}

export default App
