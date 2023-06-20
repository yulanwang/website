import React from 'react';
import Logo from '../../images/Logo';
import { BREAKPOINT } from '../helpers/types';
import useBreakpoint from '../helpers/userBreakpoint';
import NavBarMobile from './NavBarMobile.jsx';
import './NavBar.css';

export default function NavBar(isStatic = false) {
    const breakpoint= useBreakpoint();
     if (breakpoint === BREAKPOINT.MOBILE)
        return React.createElement(NavBarMobile, {isStatic : isStatic });
    const navStyling = isStatic
        ? `${'navContainer'} ${'staticNav'}`
        : 'navContainer';
        return(
        <>
        <nav className='navContainer'>
            <ul className='logoContainer'>
                {/* <Link to='/'>
                    <Logo className='logo' />
                </Link> */}
            </ul>
            <ul className='navLinks'>
                {/* <li>
                    <Link to='/'>Home</Link>
                </li>
                <li>
                    <Link to='/about'>About</Link>
                </li>
                <li>
                    <Link to='/join'>Join</Link>
                </li>
                <li>
                    <Link to='/mentor'>Mentor</Link>
                </li>
                <li>
                    <a href='https://hub.oasisneu.com/resources'>Resources</a>
                </li>
                <li>
                    <Link to='/contact'>Contact</Link>
                </li> */}
            </ul>
        </nav>
        <Outlet />
        </>
    )
        }