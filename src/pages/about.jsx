import TitleBlock from "../components/common/ContentBlock"
import React from 'react'
// import { about } from './about.module.scss'
import './about.css'
import NavBar from "../components/Navbar/Navbar"
import Sock from "../components/Footer/Sock"
import Footer from "../components/Footer/Footer"
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';


export default function About() {
    const renderTop = () => {
        return (
            <TitleBlock
                title="About"
                body={
                    <>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
                    sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.  
                    Nemo enim ipsam voluptatem quia voluptas
                    </>
                }
            />
        )
    }
    
    return (
        <>
            <NavBar isStatic="true"/>
            {renderTop()} 
            <Sock />
            <Footer />
        </>
    )
}