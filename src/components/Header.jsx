import React from 'react';
import './styles/Header.css'; 

const Header = ({ title = 'Theoatrix Toolkit' }) => {
  return (
    <header style={{ backgroundColor: "#1c1c1c" }}className="site-header">
      <h1 className="site-title">{title}</h1>
    </header>
  );
};

export default Header;
