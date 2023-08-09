"use client";

import React from "react";

import WhyJoin from "../../components/WhyJoin";
import EnrollmentTimeline from "@/components/EnrollmentTimeline";
import JoinFaqs from "@/components/JoinFaqs";
import PageWrapper from "@/components/PageWrapper";
import HackSessionTimeline from "@/components/HackSessionTimeline";
import FeaturedProjects from "@/components/FeaturedProjects";

export default function Join() {
  return (
    <PageWrapper active={"Project Series"}>
      <h1 className="my-4">{"What's the Project Series?"}</h1>
      <p className="mb-12">
        Originally the only Oasis offering, the Project Series is a one-semester
        curriculum focused on building a web app alongside a team of fellow
        beginners with help from mentors. Additionally, Weekly workshops and Hack
        Sessions, ensure you have the skills you need to bring your
        projects to life!
      </p>
      <div className="p-8 bg-oa-yellow-pastel bg-opacity-25 rounded-xl">
        <WhyJoin />
      </div>
      <EnrollmentTimeline />
      <div className="w-full bg-oa-green-pastel bg-opacity-25 rounded-xl mb-20">
      <HackSessionTimeline />
      </div>
      <JoinFaqs />
      <FeaturedProjects />
    </PageWrapper>
  );
}
