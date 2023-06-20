import React from 'react';
import * as ReactDOM from "react-dom/client";
import LandingPage from './LandingPage/LandingPage';
import About from './pages/about';
import Join from './pages/join';
import Mentor from './pages/mentor';
import Contact from  './pages/contact'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavBar from './components/NavBar/NavBar';


export default function App() {
    return (
      <BrowserRouter>
        <NavBar />
        <Routes>
            <Route index element={<LandingPage />} />
            <Route path="/about" element={<About />} />
            <Route path="/join" element={<Join />} />
            <Route path="/mentor" element={<Mentor />} />
            <Route path="/resources" element={<Mentor />} />
            <Route path="/contact" element={<Contact />} />
        </Routes>
      </BrowserRouter>
    );
}
