import React, { useState } from 'react';
import './styles/Sidebar.css'; 
import Header from './Header';

const Sidebar = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);


  const getCurrentPath = () => {
    return window.location.pathname + window.location.search;
  };

  return (
    <>
    <Header/>
    <div className="app-container fullscreen-image">
      <div className={`sidebar ${isSidebarOpen ? 'open' : ''}`}>
        <nav>
          <ul>
            <li><a className={getCurrentPath() === '/' ? 'active' : ''} href="/">Home</a></li>
            <li><a className={getCurrentPath() === '/tracker' ? 'active' : ''} href="/tracker">Account Tracker</a></li>
            <li><a className={getCurrentPath() === '/time-to-max' ? 'active' : ''} href="/time-to-max">Time To Max</a></li>
            <li><a className={getCurrentPath() === '/drop-simulator' ? 'active' : ''} href="/drop-simulator">Simulators</a></li>
            <li><a className={getCurrentPath() === '/grand-exchange' ? 'active' : ''} href="/grand-exchange">Grand Exchange</a></li>
            <li><a className={getCurrentPath() === '/account' ? 'active' : ''} href="/account">My Account</a></li>
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
