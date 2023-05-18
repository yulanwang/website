import React from 'react';
import LandingPage from '../LandingPage/LandingPage';
import Footer from '../components/Footer/Footer';
import Sock from '../components/Footer/Sock';
import NavBar from '../components/Navbar/Navbar';
import { BrowserRouter as Router } from 'react-router-dom';

export default function Homepage() {
    return (
      <Router>
        <LandingPage />
        {/* <Sock />
        <Footer /> */}
      </Router>
    )
}