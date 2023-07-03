import React from "react";
import Image from "next/image";
import PageWrapper from "@/components/PageWrapper";
import HomeAbout from "@/components/HomeAbout";
import Eboard from "@/components/Eboard";

export default function About() {
  return (
    <PageWrapper>
      <HomeAbout />
      <Eboard />
    </PageWrapper>
  );
}
