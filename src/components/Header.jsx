import React from 'react';
import './styles/Header.css'; // Assuming you have a CSS file for styles

const Header = ({ title = 'Theoatrix Toolkit' }) => {
  return (
    <header className="site-header">
      <h1 className="site-title">{title}</h1>
    </header>
  );
};

export default Header;
