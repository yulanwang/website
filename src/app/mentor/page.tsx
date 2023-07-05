"use client";

import React from "react";

import PageWrapper from "@/components/PageWrapper";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";

export default function Mentor() {
  return (
    <PageWrapper>
      <h1 className="w-full">Mentor</h1>
      <p>
        Teach participants how to learn the skills they need to bring their
        projects to life! You'll guide two groups from brainstorming through
        delivery by teaching them how to research technologies relevant to their
        project, how to weigh options between features based on deadlines, and
        you'll help them debug as issues crop up. If you've completed a co-op
        and are free from 12-2pm on Sundays, then you're ready to mentor.
      </p>
      <div className="grid md:grid-cols-2 md:grid-rows-2 grid-rows-4 grid-cols-1 gap-8 mt-8">
        {[
          {
            title: "Why",
            tagline:
              "Teach participants how to learn the skills they need to bring their projects to life! If you've completed a co-op and are free from 12-2pm on Sundays, then you're ready to mentor.",
          },
          {
            title: "Who",
            tagline:
              "Any Northeastern student who has started at least one computer science co-op. Both graduate and undergraduate students are welcome!",
          },
          {
            title: "What",
            tagline:
              "Mentors work with two teams of four students each to guide them through their making first web apps.",
          },
          {
            title: "Why",
            tagline:
              "A low-commitment chance to mentor students and help them make their ideas into reality!",
          },
        ].map(({ title, tagline }, i) => (
          <div
            className="flex flex-row items-start justify-start gap-4"
            key={i}
          >
            <FontAwesomeIcon
              className="p-2 bg-oasis-green-pastel ring-4 ring-oasis-extra-light h-4 w-4 flex items-center justify-center rounded-full text-oasis-green"
              icon={faCheck}
            />
            <div>
              <h3>{title}</h3>
              <p>{tagline}</p>
            </div>
          </div>
        ))}
      </div>
    </PageWrapper>
  );
}
