import React from 'react';
import LandingPage from '../LandingPage/LandingPage';
import About from './about';
import Join from './join';
import Mentor from './mentor';
import Contact from  './contact'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavBar from '../components/Navbar/Navbar';


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
