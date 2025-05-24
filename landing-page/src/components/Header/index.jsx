import React from 'react';
import './Header.css'; // Assuming you will create a CSS file for header styles

const Header = () => {
  return (
    <header className="header">
      <div className="logo">My Landing Page</div>
      <nav className="navigation">
        <ul>
          <li><a href="#features">Features</a></li>
          <li><a href="#testimonials">Testimonials</a></li>
          <li><a href="#pricing">Pricing</a></li>
          <li><a href="#contact">Contact</a></li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;