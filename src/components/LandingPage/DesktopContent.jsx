import React from "react";
import Image from "next/image";
import OasisImage1 from "../../../public/images/OasisCrowd1.png";
import OasisImage2 from "../../../public/images/OasisCrowd2.png";
import Footer from "../../components/Footer/Footer";
import "./DesktopContent.css";

export default function DesktopContent() {
  const about = (
    <div className="bg-oasis-light pt-20">
      <div className="flex flex-col gap-24">
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

  const timeline = (
    <div className="flex flex-col items-center pt-28">
      <h1 className="text-6xl mb-3">Session by Session</h1>

      <div className="max-w-3xl flex items-center justify-center pb-16">
        <div className="grid grid-cols-9 grid-rows-2">
          <div className="row-start-1 row-end-3 row-span-1 flex items-center justify-center col-start-1 col-end-10">
            <div className="w-full mx-4 h-1 bg-oasis-green"></div>
          </div>
          <div className="flex flex-row gap-6 row-start-1 row-end-3 row-span-1 col-start-1 col-end-10">
            {[
              { num: "0", hook: "Git-ing Started" },
              { num: "1", hook: "Shoot Your Shot" },
              { num: "2", hook: "Data for Design" },
              { num: "3", hook: "Call and Response" },
              { num: "4", hook: "Data-BASED" },
              { num: "5", hook: "Mid-Semester Showcase" },
              { num: "6", hook: "Reeling it in" },
              { num: "7", hook: "Mindset to Grindset" },
              { num: "8", hook: "Presentation Preparation" },
              { num: "D", hook: "Demo Day!" },
            ].map(({ num, hook }, i) => (
              <div
                key={i}
                className="flex flex-col items-center justify-center w-28 group"
              >
                <div
                  className={
                    "h-20 text-center flex text-sm items-end mb-4" +
                    (i % 2 === 0 ? " opacity-0 " : "")
                  }
                >
                  {hook}
                </div>
                <div
                  className={
                    "rounded-full p-2 w-10 h-10 bg-oasis-green-pastel flex items-center justify-center border-2 border-oasis-green shadow-md"
                  }
                >
                  {num}
                </div>
                <div
                  className={
                    "h-20 text-center flex text-sm items-start mt-4" +
                    (i % 2 !== 0 ? " opacity-0 " : "")
                  }
                >
                  {hook}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const numbers = (
    <div className="flex flex-col items-center">
      <h1 className="text-6xl mb-8">By the Numbers</h1>
      <div className="max-w-3xl flex flex-row gap-16 items-center justify-center">
        {[
          { count: 75, content: "Total Oasis Projects" },
          { count: 278, content: "Total Oasis Participants" },
          { count: 73, content: "Participants this Semester" },
          { count: 0, content: "Projects this Semester" },
        ].map((obj, i) => (
          <div
            key={i}
            className="bg-oasis-green-pastel rounded-3xl flex flex-col items-center justify-center max-w-md w-full p-4 h-48 shadow-md"
          >
            <h2 className="text-oasis-blue text-6xl mb-2">{obj.count}</h2>
            <p className="text-oasis-blue text-center">{obj.content}</p>
          </div>
        ))}
      </div>
    </div>
  );

  const email = (
    <div className=" text-oasis-blue flex flex-row gap-6 py-32 justify-center">
      <div className="flex flex-col gap-2 max-w-md w-2/3">
        <h2 className="text-3xl">Join our mailing list!</h2>
        <p>
          Sign up to get the latest updates on Oasis, including application
          dates for both mentors and participants.
        </p>
      </div>
      <div className="w-1/3">
        <p className="text-xl m-1">Enter your email:</p>
        <input
          className="p-2 rounded-lg m-1 hover:ring-2 transition-all duration-150 shadow-sm outline-oasis-green ring-oasis-green"
          type="email"
          placeholder="oasisneu@gmail.com"
        />
        <button
          className="hover:shadow-md shadow-sm m-1 text-oasis-green hover:ring-2 transition-all duration-150 hover:ring-oasis-green bg-oasis-extra-light font-bold p-2 px-4 rounded-lg w-fit"
          onClick={() => console.log("Submit pressed")}
        >
          Submit
        </button>
      </div>
    </div>
  );

  return (
    <div>
      <div className="bg-oasis-light mx-auto">
        <div className="max-w-4xl px-6 mx-auto">
          {about}
          {timeline}
          {numbers}
          {email}
        </div>
      </div>
      <Footer />
    </div>
  );
}
