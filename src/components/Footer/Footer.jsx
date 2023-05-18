import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '../../images/Logo';
import LogoGreen from '../../images/GreenLogo.svg';
import InstagramIcon from '../../images/InstagramIcon';
// import { footerContainer, logoContainer, linksContainer, col,
//         logo, mediaIconContainer, iconCol, circle, greenLogo } from './Footer.module.scss'
import './Footer.css'

export default function Footer() {
    return (
        <footer className='footerContainer'>
            <ul className='logoContainer'>
                <Link to='/'>
                    <Logo className='logo'/>
                </Link>
            </ul>
            <ul className='linksContainer'>
                <div className='col'>
                    <Link to='/'>
                        <li>Home</li>
                    </Link>
                    <Link to='/about'>
                        <li>About</li>
                    </Link>
                    <Link to='/join'>
                        <li>Join</li>
                    </Link>
                </div>
                <div className='col'>
                    <Link to='/mentor'>
                        <li>Mentor</li>
                    </Link>
                    <Link to='/resources'>
                        <li>Resources</li>
                    </Link>
                    <Link to='/contact'>
                        <li>Contact</li>
                    </Link>
                </div>
            </ul>
            <div className='mediaIconContainer'>
                <div className='iconCol'>
                    <div className='circle'>
                        <Link to='/'>
                            <InstagramIcon />
                        </Link>
                    </div>
                </div>
                <div className='iconCol'>
                    <div className='circle'>
                        <Link to='/'>
                            <img className='greenLogo' src={LogoGreen}/>
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    )
}