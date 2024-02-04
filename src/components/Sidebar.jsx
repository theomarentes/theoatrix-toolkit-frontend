import React, { useState } from 'react';
import './styles/Sidebar.css'; 
import Header from './Header';

const Sidebar = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  return (
    <>
    <Header/>
    <div className="app-container fullscreen-image">
      <div className={`sidebar ${isSidebarOpen ? 'open' : ''}`}>
        <nav>
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/tracker">Account Tracker</a></li>
            <li><a href="/calculators">Calculators</a></li>
            <li><a href="/drop-simulator">Simulators</a></li>
            <li><a href="/grand-exchange">Grand Exchange</a></li>
            <li><a href="/account">My Account</a></li>
          </ul>
        </nav>
      </div>
      <div className="content background-image">
        <button style={{zIndex:"10001"}}className="sidebar-toggle" onClick={toggleSidebar}>☰</button>
        {children}
      </div>
    </div>
    </>
  );
};

export default Sidebar;
