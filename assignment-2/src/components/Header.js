import Avatar from "../assets/user.png";

function Header() {
  return (
    <>
      <header className="header">
        <nav className="nav">
          <div id="nav-logo">Bookstore</div>
          <div id="nav-profile">
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
