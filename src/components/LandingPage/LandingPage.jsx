"use client";

import React from "react";
import NavBar from "../../components/Navbar/Navbar";
import DesktopContent from "./DesktopContent";
import MobileContent from "./MobileContent";
import Typewriter from "typewriter-effect";
import "./LandingPage.css";

const LandingPage = () => {
  return (
    <>
      <div className="bg-no-repeat overflow-hidden bg-cover landingPageImage h-[70vh] relative">
        <div className="animatedScrollContainer scrollAnimationComplete stickToParentEnd h-[70vh]">
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
            <p className="text-2xl pl-2 text-oasis-blue">
              Ready to make your ideas reality?
            </p>
          </div>
        </div>
      </div>
      <NavBar />
      <DesktopContent />
    </>
  );
};

export default LandingPage;
