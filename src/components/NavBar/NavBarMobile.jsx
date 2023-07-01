"use client"

import React, { useState, useEffect } from 'react';

import Logo from '../common/Logo'
import Close from '../../../public/images/Close'
import Burger from '../../../public/images/Burger'

import './NavBarMobile.css';
import Link from 'next/link';

export default function NavBarMobile(isStatic = false) {
    const [isOpen, setIsOpen] = useState(false);
    const [scrollY, setScrollY] = useState(0);
    const open = () => {
        setScrollY(window.scrollY)
        setIsOpen(true);
    };
    const close = () => {
        setIsOpen(false);
    };

    useEffect (() => {
        if (isOpen) {
            document.body.style.position = "fixed"
            document.body.style.top = `-${scrollY}px`
        } else {
            document.body.style.position = ""
            document.body.style.top = ""
            window.scrollTo(0, scrollY)
        }
    }, [isOpen, scrollY]);

    return (
        <>
        </>
    )
    
    // return (React.createElement(React.Fragment, null,
    //     React.createElement("nav", { className : `
    //     ${'navWrapper'}
    //     ${isStatic && 'staticNav'}
    //     ${isOpen && 'open'}
    //     `},
    //         React.createElement("div", { className: `${'navMobileOpenContainer'} ${isOpen && 'open'}` },
    //             React.createElement("div", { className: 'navMobileContainer'},
    //                 React.createElement(Logo, {className: 'logo'}),
    //                 React.createElement("ul", {className: 'navMobileLinks'},
    //                     React.createElement("li", {onClick: !isOpen ? open : close},
    //                         React.createElement(Close, null)))),
    //             React.createElement("ul", {className: 'navMobileOpenLinks'},
    //                 React.createElement(Link)))
    //     )))
}
