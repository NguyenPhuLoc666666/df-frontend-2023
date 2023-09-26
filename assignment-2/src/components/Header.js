import { useEffect, useState } from "react";
import Avatar from "../assets/user.png";

function Header() {
  const [darkMode, setDarkMode] = useState(() => {
    const savedDarkMode = localStorage.getItem("darkMode");
    return savedDarkMode === "true";
  });

  useEffect(() => {
    localStorage.setItem("darkMode", darkMode);
    document.body.classList.toggle("dark-mode", darkMode === true);
    document.getElementById("dark-mode-toggle").checked = darkMode;
  }, [darkMode]);

  return (
    <>
      <header className={`header ${darkMode === true ? "dark-mode" : ""}`}>
        <nav className="nav">
          <div id="nav-logo">Bookstore</div>
          <div id="nav-profile">
            <div className="toggle">
              <input
                type="checkbox"
                id="dark-mode-toggle"
                value={darkMode}
                onClick={() => setDarkMode(!darkMode)}
              />
              <label htmlFor="dark-mode-toggle" id="dark-mode-label"></label>
            </div>
            <div className="avatar">
              <img src={Avatar} alt="avatar" className="avatar-img" />
            </div>
            <div id="user-name">Felix Nguyen</div>
          </div>
        </nav>
      </header>
    </>
  );
}
export default Header;
