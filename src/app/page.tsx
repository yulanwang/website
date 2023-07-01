import React from "react";
import Image from "next/image";
import OasisImage1 from "../../public/images/OasisCrowd1.png";
import OasisImage2 from "../../public/images/OasisCrowd2.png";
import Footer from "@/components/Footer";
import "./page.css";
import OasisTypewriter from "@/components/OasisTypewriter";
import NavBar from "@/components/NavBar/NavBar";
import Link from "next/link";
import Marino from "../../public/images/Projects/HowBusyIsMarino.png";
import RoomieHub from "../../public/images/Projects/RoomieHub.png";
import TransitNU from "../../public/images/Projects/TransitNU.png";
import Sock from "@/components/Sock";

export default function Home() {
  const hook = (
    <div className="bg-no-repeat overflow-hidden bg-cover landingPageImage min-h-[360px] h-[70vh] relative">
      <div className="animatedScrollContainer scrollAnimationComplete stickToParentEnd min-h-[360px] h-[70vh] flex flex-col justify-center items-center">
        <div className="w-full min-h-[360px] max-w-[96rem] px-16 flex flex-row items-center justify-start">
          <div className="textSplash bottom-1/3 left-10 text-oasis-blue">
            <OasisTypewriter />
            <p className="text-2xl pl-2 pt-4 text-oasis-blue text-shadow-sm shadow-oasis-light">
              Ready to make your ideas reality?
            </p>
          </div>
        </div>
      </div>
    </div>
  );

  const about = (
    <div className="bg-oasis-light pt-20" id="about">
      <div className="flex flex-col gap-24">
        <div className="flex flex-row gap-8">
          <div>
            <h1 className="">About</h1>
            <p className="text-xl">
              Oasis helps students learn to build their first website and apps.
              To do this, we pair you with a team and a mentor, and then teach
              you the skills you need through Hack Sessions every Sunday. <br />{" "}
              At each Hack Session you receive a 30-minute workshop, and then
              spend 90 minutes with your team building on your project.
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
            <h1 className="">Mission</h1>
            <p className="text-xl">
              At Oasis, we believe in three key values:{" "}
              <b className="text-oasis-green underline border-oasis-green">
                remain open
              </b>
              , teach{" "}
              <b className="text-oasis-green underline border-oasis-green">
                learning to learn
              </b>{" "}
              over learning frameworks, and that the best way to learn is to{" "}
              <b className="text-oasis-green underline border-oasis-green">
                learn by doing
              </b>
              . As such, we teach as many students as we can to build not only
              their first projects, but also the skills they need to tackle
              their subsequent projects.
            </p>
          </div>
        </div>
      </div>
    </div>
  );

  const timeline = (
    <div className="flex flex-col items-center pt-28">
      <h1 className="">Session by Session</h1>

      <div className="max-w-3xl flex items-center justify-center pb-16">
        <div className="grid grid-cols-9 grid-rows-2">
          <div className="row-start-1 row-end-3 row-span-1 flex items-center justify-center col-start-1 col-end-10">
            <div className="w-full mx-4 h-1 bg-oasis-yellow"></div>
          </div>
          <div className="flex flex-row gap-6 row-start-1 row-end-3 row-span-1 col-start-1 col-end-10">
            {[
              { num: "0", hook: "Git-ing Started" },
              { num: "1", hook: "Shoot Your Shot" },
              { num: "2", hook: "Data for Design" },
              { num: "3", hook: "(API) Call and Response" },
              { num: "4", hook: "Data-BASED" },
              { num: "5", hook: "Mid-Semester Showcase" },
              { num: "6", hook: "Reeling things in" },
              { num: "7", hook: "Mindset to Grindset" },
              { num: "8", hook: "Presentation Preparation" },
              { num: "D", hook: "Demo Day!" },
            ].map(({ num, hook }, i) => (
              <div
                key={i}
                className="flex flex-col items-center justify-center w-28 group relative group"
              >
                <div
                  className={
                    "h-20 text-center whitespace-nowrap absolute top-0 flex flex-col text-sm items-center gap-2 mt-4" +
                    (i % 2 !== 0 ? " hidden " : "")
                  }
                >
                  <span className="group-hover:scale-110 duration-200 transition-all">
                    {hook}
                  </span>
                  <div className="w-[2px] rounded-full h-8 bg-oasis-yellow"></div>
                </div>
                <div
                  className={
                    "rounded-full p-2 w-10 h-10 bg-oasis-extra-light flex items-center justify-center border-0 border-oasis-green shadow-md text-oasis-yellow my-24 group-hover:scale-110 duration-200 transition-all"
                  }
                >
                  {num}
                </div>
                <div
                  className={
                    "h-20 text-center whitespace-nowrap absolute bottom-0 flex flex-col text-sm items-center gap-2 mt-4" +
                    (i % 2 === 0 ? " hidden " : "")
                  }
                >
                  <div className="group-hover:scale-110 duration-200 transition-all w-[2px] rounded-full h-8 bg-oasis-yellow"></div>
                  <span className="group-hover:scale-110 duration-200 transition-all">
                    {hook}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const numbers = (
    <div className="flex flex-col items-center pt-8">
      <h1 className="text-6xl mb-8">By the Numbers</h1>
      <div className="max-w-3xl flex flex-row gap-8 items-center justify-center">
        {[
          { count: 75, content: "Total Oasis Projects" },
          { count: 278, content: "Total Oasis Participants" },
          { count: 73, content: "Participants this Semester" },
          { count: 0, content: "Projects this Semester" },
        ].map((obj, i) => (
          <div
            key={i}
            className="bg-oasis-extra-light rounded-3xl flex flex-col items-center justify-center max-w-md w-full p-4 h-48 shadow-md"
          >
            <h2 className="text-oasis-yellow text-6xl mb-2">{obj.count}</h2>
            <p className="text-oasis-blue text-center">{obj.content}</p>
          </div>
        ))}
      </div>
    </div>
  );

  const projects = (
    <div className="mt-12 mb-24">
      <h1>Featured Projects</h1>
      <Link
        href="https://hub.oasisneu.com/"
        target="_blank"
        className="p-2 bg-oasis-yellow rounded-lg shadow-sm hover:shadow-md hover:ring-2 ring-oasis-extra-light transition-all duration-150 text-oasis-extra-light"
      >
        See All Projects
      </Link>
      <div className="grid sm:grid-cols-3 gap-6 mt-6">
        {[
          {
            title: "How Busy is Marino",
            desc: "Rollup Marino activity over time into graphical predictions for future capacity at Marino!",
            link: "",
            src: Marino,
          },
          {
            title: "Roomie Hub",
            desc: "The essential tool to track chores, groceries, schedules, and more with your roommate!",
            link: "",
            src: RoomieHub,
          },
          {
            title: "TransitNU",
            desc: "Help students track the locations of MBTA trains in and around Boston using their API.",
            link: "",
            src: TransitNU,
          },
        ].map(({ title, desc, link, src }, i) => (
          <Link
            className="flex flex-col items-center gap-4 sm:max-w-84 sm:min-w-48 sm:text-left text-center hover:bg-oasis-extra-light hover:shadow-md hover:scale-105 transition-all duration-200 p-3 rounded-md group"
            key={i}
            href={link}
          >
            <Image
              src={src}
              alt={"Image showcasing the project"}
              className="aspect-square object-contain bg-oasis-extra-light rounded-md group-hover:shadow-md"
            />
            <div className="group-hover:bg-oasis-light rounded-md p-2">
              <h3 className="text-xl">{title}</h3>
              <p className="text-lg">{desc}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );

  const email = (
    <Sock />
  );

  return (
    <div>
      {hook}
      <NavBar />
      <div className="bg-oasis-light mx-auto">
        <div className="max-w-4xl px-6 mx-auto">
          {about}
          {timeline}
          {/* put projects here */}
          {projects}
          {numbers}
          {email}
        </div>
      </div>
      <Footer />
    </div>
  );
}
