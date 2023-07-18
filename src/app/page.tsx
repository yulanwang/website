import React from "react";
import Hook from "@/components/Hook";
import PageWrapper from "@/components/PageWrapper";
import FeaturedProjects from "@/components/FeaturedProjects";
import AboutBlock from "@/components/AboutBlock"
import MentorAppsBanner from "@/components/MentorAppsBanner";

export default function Home() {
  return (
    <>
      <Hook />
      <PageWrapper active="Home">
        <MentorAppsBanner />
        <AboutBlock />
        <FeaturedProjects />
      </PageWrapper>
    </>
  );
}
