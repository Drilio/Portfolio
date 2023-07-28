import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Error from './pages/error'
import Portfolio from './pages/portfolio';
import Connection from './pages/connection';
import Header from './components/Header';
import ProjectDetails from './components/ProjectDetails';
import Footer from './components/Footer';
import './style/font.css';
import "./style/index.css"

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Portfolio />}></Route>
        <Route path="/connection" element={<Connection />}></Route>
        <Route path="/project/:id" element={<ProjectDetails />}></Route>
        <Route path="*" element={<Error />} />
      </Routes>
      <Footer />
    </Router>
  </React.StrictMode>
);


