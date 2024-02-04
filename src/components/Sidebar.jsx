import React, { useState } from 'react';
import './styles/Sidebar.css'; // Import the CSS file for styles
import Header from './Header';

const Sidebar = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  return (
    <>
    <Header/>
    <div className="app-container background-image">
      <div className={`sidebar ${isSidebarOpen ? 'open' : ''}`}>
        <nav>
          <ul>
            <li><a href="#">Home</a></li>
            <li><a href="#">Account Tracker</a></li>
            <li><a href="#">Calculators</a></li>
            <li><a href="#">Simulators</a></li>
            <li><a href="#">Grand Exchange</a></li>
            <li><a href="#">My Account</a></li>
          </ul>
        </nav>
      </div>
      <div className="content">
        <button className="sidebar-toggle" onClick={toggleSidebar}>☰</button>
        {children}
      </div>
    </div>
    </>
  );
};

export default Sidebar;
