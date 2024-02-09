import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import './styles.css'
import TrackerPage from './pages/TrackerPage';
import TimeToMaxPage from './pages/TimeToMaxPage';
import AuthPage from './pages/AuthPage';
import MyAccountPage from './pages/MyAccountPage';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
        <BrowserRouter>
              <Routes>
                  <Route path="/" element={<HomePage />} />
                  
                      <Route path="/tracker" element={<TrackerPage />} />
                      <Route path="/tracker/:username" element={<TrackerPage />} />
                      <Route path="/time-to-max/" element={<TimeToMaxPage />} />
                      <Route path="/time-to-max/:username" element={<TimeToMaxPage />} />
                      <Route path="/login" element={<AuthPage />} />
                      <Route path="/my-account" element={<MyAccountPage/>} />
                  </Routes>
        </BrowserRouter>
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
