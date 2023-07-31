import React from "react";
import Hook from "@/components/Hook";
import PageWrapper from "@/components/PageWrapper";
import FeaturedProjects from "@/components/FeaturedProjects";
import AboutBlock from "@/components/AboutBlock"
import MentorAppsBanner from "@/components/MentorAppsBanner";
import SeriesBlock from "@/components/SeriesBlock";
import MissionBlock from "@/components/MissionBlock";

export default function Home() {
  return (
    <>
      <Hook />
      <PageWrapper active="Home">
        <MentorAppsBanner />
        <AboutBlock />
        <SeriesBlock />
        <MissionBlock />
        <FeaturedProjects />
      </PageWrapper>
    </>
  );
}
