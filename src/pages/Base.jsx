import React, { useState } from 'react';
import './styles.css'; // You can import your styles here

const BasePage = () => {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <div className="base-page">
      <header className="header">
        <div className="logo">Your Logo</div>
        <div className="mobile-menu-button" onClick={toggleMobileMenu}>
          ☰
        </div>
      </header>
      
      <nav className={`left-menu ${isMobileMenuOpen ? 'mobile-open' : ''}`}>
        <ul>
          <li>Home</li>
          <li>About</li>
          <li>Contact</li>
        </ul>
      </nav>

      <main className="content">
        
      </main>
    </div>
  );
};

export default BasePage;