import React from "react";
import Image from "next/image";
import CustomImage from "../common/CustomImage";
// import { container, section1, row, image, text1, text2, col,
//         section2, reverse, grid, title, timelineContainer, section3} from './DesktopContent.module.scss'
import Timeline from "../../components/Timeline/Timeline";
import Card from "../../components/card/Card";
import ContentBlock from "../../components/common/ContentBlock";
import OasisImage1 from "../../../public/images/OasisCrowd1.png";
import OasisImage2 from "../../../public/images/OasisCrowd2.png";
import Footer from "../../components/Footer/Footer";
// import Sock from "../../components/Footer/Sock";
import "./DesktopContent.css";
import NavBar from "../../components/Navbar/Navbar.jsx";

export default function DesktopContent() {
  const AboutSection = (
    <div className="bg-oasis-light">
      <div className="flex flex-col gap-16">
        <div className="flex flex-row gap-8">
          <div>
            <h1 className="text-6xl mb-3">About</h1>
            <p className="text-xl">
              Oasis helps students learn to build their first website and apps.
              To do this, we pair you with a team and a mentor, and then teach
              you the skills you need through Hack Sessions every Sunday. <br />{" "}
              At each Hack Session you receive a 30-minute workshop, and then 90
              minutes with your team building on your project.
            </p>
          </div>

          <Image
            className="shadow-xl object-cover"
            src={OasisImage2}
            alt={"Oasis Hack Session"}
          />
        </div>
        <div className="flex flex-row gap-8">
          <Image
            className="shadow-xl object-cover"
            src={OasisImage1}
            alt={"Oasis Hack Session"}
          />
          <div>
            <h1 className="text-6xl mb-3">Mission</h1>
            <p className="text-xl">
              At Oasis, we believe in three key values: remaining open, teaching
              learning to learn over learning to do, and that the best way to
              learn is by doing. As such, we teach as many students as we can to
              build not only their first project, but also the skills they need
              to tackle subsequent projects.
            </p>
          </div>
        </div>
      </div>
    </div>
  );

  const TimelineSection = () => {
    return (
      <div className="section2">
        <ContentBlock title="Semester at a Glance" />
        <div className="timelineContainer">
          <Timeline />
        </div>
      </div>
    );
  };

  const OasisNumbersSection = (
    <div className="bg-oasis-light flex flex-col items-center pt-24">
      <h1 className="text-4xl text-oasis-blue mb-8">Oasis by the Numbers</h1>
      <div className="max-w-3xl flex flex-row gap-16 items-center justify-center">
        {[
          { count: 75, content: "Total Oasis Projects" },
          { count: 278, content: "Total Oasis Participants" },
          { count: 73, content: "Participants this Semester" },
          { count: 0, content: "Projects this Semester" },
        ].map((obj, i) => (
          <div
            key={i}
            className="bg-oasis-green-pastel rounded-3xl flex flex-col items-center justify-center max-w-md w-full p-4 h-48"
          >
            <h2 className="text-oasis-blue text-6xl mb-2">{obj.count}</h2>
            <p className="text-oasis-blue text-center">{obj.content}</p>
          </div>
        ))}
      </div>
    </div>
  );

  const Bottom = () => {
    return (
      <div className="section4">
        {/* <Sock /> */}
        <Footer />
      </div>
    );
  };

  return (
    <div>
      <div className="bg-oasis-light mx-auto">
        <div className="max-w-4xl px-6 mx-auto">
          {AboutSection}
          <div className="flex flex-col items-center pt-24">
            <h1 className="text-4xl text-oasis-blue mb-8">
              Session by Session
            </h1>

            <div className="max-w-3xl flex items-center justify-center">
              <div className="grid grid-cols-9 grid-rows-3">
                <div className="row-start-1 row-end-3 row-span-1 flex items-center justify-center col-start-1 col-end-10">
                  <div className="w-full h-1 bg-oasis-green"></div>
                </div>
                <div className="flex flex-row gap-6 row-start-1 row-end-3 row-span-1 col-start-1 col-end-10">
                  {["0", "1", "2", "3", "4", "5", "6", "7", "8", "D"].map(
                    (char, i) => (
                      <div>
                        <div
                          className={
                            "rounded-full p-2 w-10 h-10 bg-oasis-green-pastel flex items-center justify-center border-2 border-oasis-green"
                          }
                          key={i}
                        >
                          {char}
                        </div>
                      </div>
                    )
                  )}
                </div>
              </div>
            </div>
          </div>
          {/* {TimelineSection()} */}

          <div className=" text-oasis-blue flex flex-row gap-6 py-16 justify-center">
            <div className="flex flex-col gap-2 max-w-md">
              <h2 className="text-3xl">Join our mailing list!</h2>
              <p>
                Sign up to get the latest updates on Oasis, including
                application dates for both mentors and participants.
              </p>
            </div>
            <div className="">
              <p className="text-xl m-1">Enter your email:</p>
              <input
                className="p-2 rounded-lg m-1 hover:ring-2 outline-oasis-green ring-oasis-green"
                type="email"
                placeholder="oasisneu@gmail.com"
              />
              <button
                className="hover:shadow-sm m-1 text-oasis-green hover:ring-2 hover:ring-oasis-green bg-oasis-extra-light font-bold p-2 px-4 rounded-lg w-fit"
                onClick={() => console.log("Submit pressed")}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
      {Bottom()}
    </div>
  );
}
