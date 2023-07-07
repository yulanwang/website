import React from "react";
import Hook from "@/components/Hook";
import PageWrapper from "@/components/PageWrapper";
import FeaturedProjects from "@/components/FeaturedProjects";
// import HackSessionTimeline from "@/components/HackSessionTimeline";
// import ProjectSeriesBlock from "@/components/ProjectSeriesBlock";
import OasisNumbers from "@/components/OasisNumbers";

export default function Home() {
  return (
    <>
      <Hook />
      <PageWrapper>
        {/* <HomeAbout /> */}
        {/* <ProjectSeriesBlock /> */}
        <FeaturedProjects />
        <OasisNumbers />
      </PageWrapper>
    </>
  );
}
