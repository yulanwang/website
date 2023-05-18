import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '../../images/Logo';
import { BREAKPOINT } from '../helpers/types';
import useBreakpoint from '../helpers/userBreakpoint';
import NavBarMobile from './NavBarMobile.jsx'
import './NavBar.css';

export default function NavBar({ isStatic = false}) {
    const breakpoint= useBreakpoint()
    if (breakpoint === BREAKPOINT.MOBILE) return <NavBarMobile isStatic={isStatic} />;
    
    return(
        <nav className='navContainer'>
            <ul className='logoContainer'>
                <li to='/'>
                    <Logo className='logo' />
                </li>
            </ul>
            <ul className='navLinks'>
                <Link to='/'>
                    <li>Home</li>
                </Link>
                    <Link to='/about'>
                        <li>About</li>
                    </Link>
                <Link to='/join'>
                    <li>Join</li>
                </Link>
                <Link to='/mentor'>
                    <li>Mentor</li>
                </Link>
                <Link to='https://hub.oasisneu.com/resources'>
                    <li>Resources</li>
                </Link>
                <Link to='/contact'>
                    <li>Contact</li>
                </Link>
            </ul>
        </nav>
    )
}