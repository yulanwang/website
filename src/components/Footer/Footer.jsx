import React from 'react';
import Logo from '../../../public/images/Logo';
import LogoGreen from '../../../public/images/GreenLogo.svg';
import InstagramIcon from '../../../public/images/InstagramIcon';
import './Footer.css'

export default function Footer() {
    return (
        <footer className='footerContainer'>
            <ul className='logoContainer'>
                <a href='/'>
                    <Logo className='logo'/>
                </a>
            </ul>
            <ul className='linksContainer'>
                <div className='col'>
                    <li>
                        <a href='/'>Home</a>
                    </li>
                    <li>
                        <a href='/about'>About</a>
                    </li>
                    <li>
                        <a href='/join'>Join</a>
                    </li>
                </div>
                <div className='col'>
                    <li>
                        <a href='/mentor'>Mentor</a>
                    </li>
                    <li>
                        <a href='https://hub.oasisneu.com/resources'>Resources</a>
                    </li>
                    <li>
                        <a href='/contact'>Contact</a>
                    </li>
                </div>
            </ul>
            <div className='mediaIconContainer'>
                <div className='iconCol'>
                    <div className='circle'>
                        <a href='/'>
                            <InstagramIcon />
                        </a>
                    </div>
                </div>
                <div className='iconCol'>
                    <div className='circle'>
                        <a href='/'>
                            <img className='greenLogo' src={LogoGreen}/>
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    )
}