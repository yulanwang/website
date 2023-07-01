"use client";

import React from "react";
import { useState, useEffect, useRef } from "react";
import useBreakpoint from "../../components/helpers/userBreakpoint";
import { BREAKPOINT } from "../../components/helpers/types";
import ArrowDown from "../../../public/images/ArrowDown";
import NavBar from "../../components/Navbar/Navbar";
import DesktopContent from "./DesktopContent";
import MobileContent from "./MobileContent";
import Typewriter from "typewriter-effect";
import Parallax from "../../components/parallax";
import "./LandingPage.css";
import Link from "next/link";

import OasisHero from "../../../public/images/OasisHero";

const LOGO_ZOOM_FULL_SCALE = 3;

const LandingPage = () => {
  const breakpoint = useBreakpoint();
  const [scrollAnimationComplete, setScrollAnimationComplete] = useState(false);
  const [zoomScale, setZoomScale] = useState(1);
  const logoTransformStyling = {
    transform: `scale(${zoomScale})`,
  };
  const navRef = useRef(null);

  const handleClickScroll = () =>
    navRef.current?.scrollIntoView({ behavior: "smooth" });

  useEffect(() => {
    let logoZoomScrollDistance = window.innerHeight * 0.75;
    const calculateScale = (scrollY) => {
      const computedScale =
        LOGO_ZOOM_FULL_SCALE * (scrollY / logoZoomScrollDistance) + 1;
      if (computedScale > LOGO_ZOOM_FULL_SCALE) {
        return LOGO_ZOOM_FULL_SCALE;
      }
      return computedScale;
    };

    // set correct scale for logo on initial render
    setZoomScale(calculateScale(window.scrollY));

    window.addEventListener("scroll", () => {
      if (window.scrollY <= logoZoomScrollDistance) {
        setZoomScale(calculateScale(window.scrollY));
      }
    });

    // update scroll distance when viewport size changes
    window.addEventListener("resize", () => {
      logoZoomScrollDistance = window.innerHeight * 0.75;
    });
  }, []);

  useEffect(() => {
    setScrollAnimationComplete(zoomScale === LOGO_ZOOM_FULL_SCALE);
  }, [zoomScale]);

  const renderText = () => {
    return (
      <div className="textSplash absolute bottom-1/3 left-10 text-oasis-blue">
        <h1 className="h-[16rem] text-[150px]">
          <Typewriter
            options={{
              autoStart: true,
              loop: true,
              delay: 100,
              pauseFor: 10000,
              strings: ["Oasis"],
            }}
          />
        </h1>
        <p className="text-2xl pl-1 text-oasis-blue">
          Ready to make your ideas reality?
        </p>
      </div>
    );
  };
  return (
    <>
      <div className="bg-no-repeat overflow-hidden bg-cover landingPageImage h-[90vh] relative">
        <div className="animatedScrollContainer scrollAnimationComplete stickToParentEnd h-[90vh]">
          {renderText()}
          {/* <a
            onClick={handleClickScroll}
            className="text-oasis-extra-light linkContainer cursor-pointer flex flex-row items-center gap-2 absolute bottom-12 left-1/2 -translate-x-1/2 text-2xl hover:drop-shadow-xl"
          >
            <li>Learn More</li>
            <ArrowDown className="arrow" />
          </a> */}
        </div>
      </div>
      <NavBar />
      <div ref={navRef}>
        {breakpoint === BREAKPOINT.MOBILE ? (
          <MobileContent />
        ) : (
          <DesktopContent />
        )}
      </div>
    </>
  );
};

export default LandingPage;
