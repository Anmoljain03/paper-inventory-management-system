import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css"; // Import styles

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  
  const closeMenu = () => {
    setIsOpen(false);
  };

  return (
    <nav className="navbar">
      <div className="logo">📜 Jain Printers</div>
      <ul className={`nav-links ${isOpen ? "active" : ""}`}>
        <li>
          <Link to="/" onClick={closeMenu}>Home</Link>
        </li>
        <li>
          <Link to="/add-paper" onClick={closeMenu}>Add Paper</Link>
        </li>
        <li>
          <Link to="/papers" onClick={closeMenu}>Available Papers</Link>
        </li>
        <li>
          <Link to="/assign-paper" onClick={closeMenu}>Assign Paper</Link>
        </li>
        <li>
          <Link to="/assigned-papers" onClick={closeMenu}>Assigned Papers</Link>
        </li>
      </ul>
      <div className="hamburger-icon" onClick={toggleMenu}>
        ☰
      </div>
    </nav>
  );
};

export default Navbar;
