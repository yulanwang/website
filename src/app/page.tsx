import React from "react";
import Hook from "@/components/Hook";
import PageWrapper from "@/components/PageWrapper";
import FeaturedProjects from "@/components/FeaturedProjects";
import AboutBlock from "@/components/AboutBlock"

export default function Home() {
  return (
    <>
      <Hook />
      <PageWrapper active="Home">
        <AboutBlock />
        <FeaturedProjects />
      </PageWrapper>
    </>
  );
}
