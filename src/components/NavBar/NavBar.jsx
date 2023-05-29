import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '../../images/Logo';
import { BREAKPOINT } from '../helpers/types';
import useBreakpoint from '../helpers/userBreakpoint';
import NavBarMobile from './NavBarMobile.jsx';
import './NavBar.css';

export default function NavBar() {
    const breakpoint= useBreakpoint()
    // if (breakpoint === BREAKPOINT.MOBILE) return <NavBarMobile isStatic={isStatic} />;
    

    return(
        <nav className='navContainer'>
            <ul className='logoContainer'>
                <a href='/'>
                    <Logo className='logo' />
                </a>
            </ul>
            <ul className='navLinks'>
                <li>
                    <a href='/'>Home</a>
                </li>
                <li>
                    <a href='/about'>About</a>
                </li>
                <li>
                    <a href='/join'>Join</a>
                </li>
                <li>
                    <a href='/mentor'>Mentor</a>
                </li>
                <li>
                    <a href='https://hub.oasisneu.com/resources'>Resources</a>
                </li>
                <li>
                    <a href='/contact'>Contact</a>
                </li>
            </ul>
        </nav>
    )
}