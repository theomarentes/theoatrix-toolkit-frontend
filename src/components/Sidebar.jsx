import React, { useState } from 'react';
import './styles/Sidebar.css'; 
import Header from './Header';

const Sidebar = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);


  const getCurrentPath = () => {
    return window.location.pathname + window.location.search;
  };

  const is_tracker = () => {
    return getCurrentPath().match(/^\/tracker(\/.*|)$/);
  };

  const is_grand_exchange = () => {
    return getCurrentPath().match(/^\/grand-exchange(\/.*|)$/);
  };

  return (
    <>
    <Header/>
    <div className="app-container fullscreen-image">
      <div className={`sidebar ${isSidebarOpen ? 'open' : ''}`}>
        <nav>
          <ul>
            <li><a className={getCurrentPath() === '/' ? 'active' : ''} href="/">Home</a></li>
            <li><a className={is_tracker()? 'active' : ''} href="/tracker">Account Tracker</a></li>
            <li><a className={getCurrentPath() === '/time-to-max' ? 'active' : ''} href="/time-to-max">Time To Max</a></li>
            <li><a className={getCurrentPath() === '/simulator' ? 'active' : ''} href="/simulator">Drop Simulator</a></li>
            <li><a className={is_grand_exchange() === '/grand-exchange' ? 'active' : ''} href="/grand-exchange">Grand Exchange</a></li>
            <li><a className={getCurrentPath() === '/my-account' ? 'active' : ''} href="/my-account">My Account</a></li>
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
