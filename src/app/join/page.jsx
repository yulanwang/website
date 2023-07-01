"use client";

import React from "react";
import { useState } from "react";

import NavBar from "@/components/NavBar/NavBar";
import Footer from "@/components/Footer";
import Sock from "@/components/Sock";

export default function Join() {
  const why = (
    <div className="w-full">
      <h1>Why join?</h1>
      <p>
        With support from our mentors, your group, and the Oasis community,
        bring your software idea to life.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full pt-16">
        {[
          {
            icon: "",
            head: "Bridge the gap between classes and co-op.",
            body: "Learn co-op applicable skills, not taught in everyday coursework.",
          },
          {
            icon: "",
            head: "Designed for all backgrounds and experience levels.",
            body: "We have the resources to get you started, no matter your experience level.",
          },
          {
            icon: "",
            head: "The place to pursue project ideas together!",
            body: "Work with a team and a mentor to build a real project from scratch.",
          },
        ].map(({ icon, head, body }, i) => (
          <div
            className="flex flex-col items-center gap-4 sm:max-w-84 sm:min-w-48 sm:text-left text-center"
            key={i}
          >
            <div className="h-16 w-16 rounded-full bg-oasis-yellow-pastel ring-8 ring-oasis-extra-light shadow-lg mb-2"></div>
            <div>
              <h3 className="text-xl">{head}</h3>
              <p className="text-lg">{body}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const timeline = (
    <div className="pt-20 w-full">
      <h1>Enrollment Timeline</h1>
      <p>
        Each semester we welcome a new cohort of students. We're limited in how
        many students we can accept due to a limited number of available
        mentors. This process is subject to change each semester, but this is
        the typical series of events.
      </p>
      <p className="mt-1">
        <b className="text-oasis-green p">
          Acceptance is is first-come-first-serve; it is not based on your
          abilities or background.
        </b>
      </p>
      <ol class="relative border-l border-oasis-light my-4 grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8 mb-12">
        {[
          {
            num: "1",
            tag: "Info Session + Registration",
            time: "1st Sunday of the semester",
            desc: "Learn more about what Oasis is, our Hack Session timeline, new changes for this year, and meet our Eboard. At the end of the Info Session, Registration will open. It's unlikely you'll be able to join if you're not at the Info Session.",
          },
          {
            num: "2",
            tag: "Confirmation",
            time: "Within a week after the Info Session",
            desc: "If you've registered and we have a space available for you, you'll receive a form to complete in order to confirm your spot as a Participant for the coming semester. Completing this form reserves your space.",
          },
          {
            num: "3",
            tag: "Hack Session 0 (open to all!)",
            time: "2nd Sunday of the semester",
            desc: "Hack Session 0 is our Git and React basics workshop. It's open to all students, regardless of Enrollment status, and is a great way to launch your web development journey!",
          },
          {
            num: "4",
            tag: "Hack Sessions begin",
            time: "3rd Sunday of the Semester",
            desc: "Once the enrollment process is complete weekly Sunday Hack Sessions begin. Unfortunately, attendance at Hack Sessions is restricted to accepted students only. For students still looking to get involved, we host Explore Events roughly once a month.",
          },
        ].map(({ num, tag, time, desc }, i) => (
          <li class="relative ml-8">
            <div className="absolute ring-[3px] -translate-x-7 translate-y-[0.2rem] ring-oasis-extra-light bg-oasis-yellow-pastel h-5 w-5 rounded-full flex items-center justify-center text-xs text-oasis-blue">
              {num}
            </div>
            <h3 class="flex items-center mb-1 text-lg font-semibold">{tag}</h3>
            <time class="block mb-2 text-sm font-normal leading-none text-oasis-gray">
              {time}
            </time>
            <p class="mb-4 text-base font-normal text-oasis-blue">{desc}</p>
          </li>
        ))}
      </ol>
    </div>
  );

  const faqs = (
    <div className="w-full">
      <h1>FAQs</h1>
      {[
        {
          q: "How do you assess applications?",
          a: "We don't asses them in the traditional sense. We pride ourselves on being open to students from all backgrounds and experience levels, so our application is first-come first-serve to keep it simple and fair for everybody.",
        },
        {
          q: "How many students are in a normal cohort?",
          a: "A typical semester is roughly 80 students. We target 10 mentors each semester, and each mentor takes two groups of four students each.",
        },
      ].map(({ q, a }, i) => {
        const [isOpen, setIsOpen] = useState(false);

        return (
          <div
            key={i}
            className="border-t-2 border-oasis-green-pastel py-4"
          >
            <button onClick={() => {setIsOpen(!isOpen)}} className="w-full flex flex-row justify-between items-center">
              <h4 className="text-xl">{q}</h4>
              <p className={"px-2 transition-all duration-300 text-oasis-green-pastel" + (isOpen ? " rotate-180 " : " ")}>{isOpen ? "-" : "+"}</p>
            </button>
            <p className={"text-lg pt-2 transition-all duration-300 text-oasis-blue" + (isOpen ? "" : " scale-y-0 hidden")}>{a}</p>
          </div>
        );
      })}
    </div>
  );

  return (
    <div className="bg-oasis-light">
      <NavBar />
      <div className="max-w-6xl flex flex-col items-center mx-auto pt-8 px-6">
        {/* we need something fun up here; maybe a photo collage */}
        {why}
        {timeline}
        {faqs}
        <Sock />
      </div>
      <Footer />
    </div>
  );
}
