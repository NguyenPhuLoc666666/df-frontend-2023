import React, { type FC } from 'react'
import Image from 'next/image'

interface Props {
  setTheme: React.Dispatch<React.SetStateAction<string>>
}
const Header: FC<Props> = ({ setTheme }) => {
  const handleInputChange = (): void => {
    const currentTheme = (prevTheme: string): string =>
      prevTheme === 'dark' ? 'light' : 'dark'
    setTheme(currentTheme)
  }
  return (
    <header className="dark:bg-gray-900 dark:text-white bg-white w-full sticky top-0 left-0 z-[1000]">
      <nav
        className="md:w-[90%] dark:bg-gray-950 dark:text-white shadow-md dark:shadow-white
       shadow-black mx-auto w-full p-4 flex justify-between"
      >
        <div className="text-2xl font-bold cursor-pointer">Bookstore</div>
        <div className="flex justify-center items-center">
          <div className="flex mx-4 border rounded-full">
            <label
              htmlFor="dark-mode-toggle"
              id="dark-mode-label"
              className="flex relative w-12 h-6"
            >
              <input
                type="checkbox"
                id="dark-mode-toggle"
                className="w-0 h-0"
                onChange={handleInputChange}
              />
              <div className="toggle-indicator w-6 h-6 absolute top-0 left-0 z-10 bg-gradient-to-r from-yellow-300 to-orange-600 rounded-full shadow-md transition duration-300" />
              <div className="dark-mode-background w-12 h-6 relative block cursor-pointer z-5 rounded-full duration-300 shadow-inner sm:shadow bg-opacity-10 blur-sm" />
            </label>
          </div>
          <div className="w-8 h-8">
            <Image src="/user.png" alt="avatar" width={32} height={32} />
          </div>
          <div className=" ml-2 text-base cursor-pointer">Felix Nguyen</div>
        </div>
      </nav>
    </header>
  )
}
export default Header
