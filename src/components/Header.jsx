import React from 'react';
import './styles/Header.css'; 

const Header = ({ title = 'Theoatrix Toolkit', onClick }) => {
  return (
    <header className="site-header">
      <a className="site-title" href="/" onClick={onClick}>{title}</a>
    </header>
  );
};
export default Header;