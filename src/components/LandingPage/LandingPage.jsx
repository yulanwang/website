"use client"

import React from 'react';
import { useState, useEffect, useRef } from 'react';
import useBreakpoint from "../../components/helpers/userBreakpoint";
import { BREAKPOINT } from '../../components/helpers/types';
import ArrowDown from '../../images/ArrowDown';
import NavBar from '../../components/Navbar/Navbar';
import DesktopContent from './DesktopContent';
import MobileContent from './MobileContent'
import Typewriter from 'typewriter-effect'
import Parallax from '../../components/parallax';
import './LandingPage.css'
import Link from 'next/link';

import OasisHero from '../../images/OasisHero';

const LOGO_ZOOM_FULL_SCALE = 3;

const LandingPage = () => {
    const breakpoint = useBreakpoint()
    const [scrollAnimationComplete, setScrollAnimationComplete] = useState(false)
    const [zoomScale, setZoomScale] = useState(1);
    const logoTransformStyling = {
      transform: `scale(${zoomScale})`
    }
    const navRef = useRef(null);

    const handleClickScroll = () => navRef.current?.scrollIntoView({behavior: 'smooth'});
    
    useEffect(() => {
        let logoZoomScrollDistance = window.innerHeight * 0.75;
        const calculateScale = scrollY => {
          const computedScale = (LOGO_ZOOM_FULL_SCALE * (scrollY / logoZoomScrollDistance)) + 1;
          if (computedScale > LOGO_ZOOM_FULL_SCALE) {
            return LOGO_ZOOM_FULL_SCALE;
          }
          return computedScale;
        }
    
        // set correct scale for logo on initial render
        setZoomScale(calculateScale(window.scrollY));
    
        window.addEventListener('scroll', () => {
          if (window.scrollY <= logoZoomScrollDistance) {
            setZoomScale(calculateScale(window.scrollY));
          }
        });
    
        // update scroll distance when viewport size changes
        window.addEventListener('resize', () => {
          logoZoomScrollDistance = window.innerHeight * 0.75;
        });
      }, []);

    useEffect(() => {
        setScrollAnimationComplete(zoomScale === LOGO_ZOOM_FULL_SCALE);
    }, [zoomScale]);

    const renderText = () => {
      return (
        <div className='textSplash'>
            <h1>
              <Typewriter 
                options={{
                  autoStart: true,
                  loop: false,
                  delay: 100,
                  pauseFor: 100000,
                  strings: ["Oasis"]
                }}
              />
            </h1>
            <p>Ready to make your ideas reality?</p>
        </div>
      )
    }
    return (
        <>
            <div className='landingPage'>
                <div className='animatedScrollContainer scrollAnimationComplete stickToParentEnd'>   
                {renderText()}              
                  <div className='bottomRow'>
                    <div className='dateAndLocation'>
                      <a onClick={handleClickScroll} className='linkContainer'>
                        <li>Learn More</li>
                        <ArrowDown className='arrow' />
                      </a>
                    </div>
                  </div>
                </div>
            </div>
            <div ref={navRef}>
              <NavBar />
              {breakpoint === BREAKPOINT.MOBILE
              ? <MobileContent/>
              : <DesktopContent/>
              }
            </div>
            
        </>
    )
}

export default LandingPage;