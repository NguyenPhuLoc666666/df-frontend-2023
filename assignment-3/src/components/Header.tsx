import React, { FC } from 'react'
import Avatar from '../assets/user.png'

interface Props {
  darkMode: boolean
  setDarkMode: React.Dispatch<React.SetStateAction<boolean>>
}

const Header: FC<Props> = ({ darkMode, setDarkMode }) => {
  return (
    <header className={`header ${darkMode === true ? 'dark-mode' : ''}`}>
      <nav className="nav">
        <div id="nav-logo">Bookstore</div>
        <div id="nav-profile">
          <div className="toggle">
            <label htmlFor="dark-mode-toggle" id="dark-mode-label">
              <input
                type="checkbox"
                id="dark-mode-toggle"
                defaultChecked={darkMode}
                onClick={() => setDarkMode(!darkMode)}
              />
            </label>
          </div>
          <div className="avatar">
            <img src={Avatar} alt="avatar" className="avatar-img" />
          </div>
          <div id="user-name">Felix Nguyen</div>
        </div>
      </nav>
    </header>
  )
}
export default Header
