import React, {useEffect} from 'react';
import ThemeToggle from './themeToggle';

const Navbar = ({ menuOpen, setMenuOpen }) => {
    useEffect(() => {
        if (menuOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "auto";
        }
        return () => {
            document.body.style.overflow = "auto";
        };
    }, [menuOpen]);

  return (
      <nav className="nav">
          <h2>JobBoard</h2>
          <div className="menu-icon" onClick={() => setMenuOpen(!menuOpen)}>
              {menuOpen ? <span style={{ fontSize: "20px", marginRight: "3px" }}>✕</span> : "☰"}
          </div>
          <div className={`nav-links ${menuOpen ? "active" : ""}`}>
              <ThemeToggle />
              <a href="/login" className="nav-links-login">Login</a>
              <a href="/register" className="btn-primary">Signup</a>
          </div>
      </nav>
  )
}

export default Navbar