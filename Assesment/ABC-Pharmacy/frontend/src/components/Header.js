import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Header.css';

const Header = () => {
  const location = useLocation();

  return (
    <header className="modern-header">
      <div className="header-container">
        <Link to="/" className="header-title">
          ABC Pharmacy
        </Link>
        <nav className="header-nav">
          <ul>
            <li className={location.pathname === '/' ? 'active' : ''}>
              <Link to="/">Home</Link>
            </li>
            <li className={location.pathname === '/about' ? 'active' : ''}>
              <Link to="/about">About</Link>
            </li>
            <li className={location.pathname === '/services' ? 'active' : ''}>
              <Link to="/services">Services</Link>
            </li>
            <li className={location.pathname === '/contact' ? 'active' : ''}>
              <Link to="/contact">Contact</Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
