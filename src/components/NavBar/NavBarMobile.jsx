import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import Logo from '../../images/Logo'
import Close from '../../images/Close'
import Burger from '../../images/Burger'

import './NavBarMobile.css';

export default function NavBarMobile({isStatic =false}) {
    const [isOpen, setIsOpen] = useState(false)
    const [scrollY, setScrollY] = useState(0)
    const open = () => {
        setScrollY(window.scrollY)
        setIsOpen(true)
    }
    const close = () => {
        setIsOpen(false)
    }

    useEffect (() => {
        if (isOpen) {
            document.body.style.position = "fixed"
            document.body.style.top = `-${scrollY}px`
        } else {
            document.body.style.position = ""
            document.body.style.top = ""
            window.scrollTo(0, scrollY)
        }
    }, [isOpen, scrollY])

    return (
        <>
        <nav
            className='navWrapper isStatic staticNav isOpen open'
            // ${navWrapper}
            // ${isStatic && staticNav}
            // ${isOpen && open}
            // `}
        >
            <div
                className='navMobileOpenContainer isOpen open'
                    // `${navMobileOpenContainer} ${isOpen &&
                    // open}`}
            >
            <div className='navMobileOpenContainer'>
                <Logo className='logo' />
                <ul className='navMobileLinks'>
                    <li onClick={!isOpen ? open : close}>
                        <Close /> 
                    </li>
                </ul>
            </div>
            <ul className='navMobileOpenLinks'>
                <Link href='/' onClick={!isOpen ? open : close}>
                    <li>Home</li>
                </Link>
                <Link href='/about' onClick={!isOpen ? open : close}>
                    <li>About</li>
                </Link>
                <Link href='/join' onClick={!isOpen ? open : close}>
                    <li>Join</li>
                </Link>
                <Link href='/mentor' onClick={!isOpen ? open : close}>
                    <li>Mentor</li>
                </Link>
                <Link href='/resources' onClick={!isOpen ? open : close}>
                    <li>Resources</li>
                </Link>
                <Link href='/Contact' onClick={!isOpen ? open : close}>
                    <li>Contact</li>
                </Link>
            </ul>
            </div>
            <div className='navMobileContainer isStatic navTopBorder'
            // {`
            //     ${navMobileContainer}
            //     ${isStatic && navTopBorder}`}
                >
                <Logo className='logo' />
                <li className='burger'
                onClick={!isOpen ? open : close}>
                    <Burger />
                </li>
            </div>
        </nav>
        </>
    )
}
