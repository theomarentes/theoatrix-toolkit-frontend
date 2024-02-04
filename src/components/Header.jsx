import React from 'react';
import './styles/Header.css'; 

const Header = ({ title = 'Theoatrix Toolkit' }) => {
  return (
    <header style={{ backgroundColor: "#1c1c1c" }} className="site-header">
     <button class="header-button"><h1 className="site-title">{title}</h1></button>
    </header>
  );
};

export default Header;
