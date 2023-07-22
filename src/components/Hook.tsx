import React from "react";
import OasisTypewriter from "@/components/OasisTypewriter";
import "./Hook.css";
import strings from "@/app/strings";
import MentorAppsBanner from "./MentorAppsBanner";

export default function Hook() {
  return (
    <div className="bg-no-repeat overflow-hidden bg-cover landingPageImage min-h-[360px] h-[91.5vh] relative">
      <div className="absolute top-0 right-0 mt-0 mr-10 ml-10">
        <MentorAppsBanner />
      </div>
      <div className="min-h-[360px] h-[70vh] flex flex-col justify-end items-center"> {/* Change justify-center to justify-end */}
        <div className="w-full min-h-[300px] max-w-[96rem] px-16 flex flex-row items-center justify-start relative">
          <div className="bottom-1/6 xs:left-10 xs:text-left text-center left-0 right-0 text-oasis-blue"> {/* Adjust bottom value */}
            <OasisTypewriter />
            <p className="text-2xl px-2 pt-1 -mt-4 text-oasis-blue text-shadow-sm shadow-oasis-light xs:text-left text-center"> {/* Add negative margin to overlap */}
              {strings.Hook.tagline}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
