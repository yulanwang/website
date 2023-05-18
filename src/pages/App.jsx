import React from 'react';
import { BrowserRouter as Router, Routes, Route, Switch, BrowserRouter} from "react-router-dom";
import NavBar from '../components/Navbar/Navbar';
import LandingPage from '../LandingPage/LandingPage';
import About from './about';
import Mentor from './mentor';
import Join from './join';
import Contact from './contact';

function App() {
    
    return (
        <BrowserRouter>
            <NavBar>
            <Routes>
                <Route path='/' element={<LandingPage />} />
                <Route path='/about' element={<About />} />
                <Route path='/join' element={<Join />} />
                <Route path='/mentor' element={<Mentor />} />
                <Route path='/resources' href="https://hub.oasisneu.com/resources" />
                <Route path='/contact' element={<Contact />} />
            </Routes>
            </NavBar>
        </BrowserRouter>
    )
}



export default App;