import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/home/home';
import About from './pages/about'
import Error from './pages/error'
import Portfolio from './pages/portfolio';
import Contacts from './pages/contacts';
import Connection from './pages/connection';
import Header from './components/Header';
import Banner from './components/Banner';
import ProjectDetails from './components/ProjectDetails';
import Footer from './components/Footer';
import './style/font.css';
import "./style/index.css"

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
      <Header />
      <Banner />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/about" element={<About />}></Route>
        <Route path="/contacts" element={<Contacts />}></Route>
        <Route path="/portfolio" element={<Portfolio />}></Route>
        <Route path="/connection" element={<Connection />}></Route>
        <Route path="/project/:id" element={<ProjectDetails />}></Route>
        <Route path="*" element={<Error />} />
      </Routes>
      <Footer />
    </Router>
  </React.StrictMode>
);


