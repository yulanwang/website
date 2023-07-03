import React from "react";
import Hook from "@/components/Hook";
import PageWrapper from "@/components/PageWrapper";
import HomeAbout from "@/components/HomeAbout";
import FeaturedProjects from "@/components/FeaturedProjects";
import HackSessionTimeline from "@/components/HackSessionTimeline";
import OasisNumbers from "@/components/OasisNumbers";

export default function Home() {
  return (
    <>
      <Hook />
      <PageWrapper>
        <HomeAbout />
        <HackSessionTimeline />
        <FeaturedProjects />
        <OasisNumbers />
      </PageWrapper>
    </>
  );
}
