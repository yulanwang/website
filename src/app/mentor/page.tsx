"use client";

import React from "react";

import PageWrapper from "@/components/PageWrapper";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import MentorBlock from "@/components/MentorBlock";
import MentorHeader from "@/components/MentorHeader";
import BannerCard from "@/components/BannerCard";
import MentorAppsBanner from "@/components/MentorAppsBanner";

export default function Mentor() {
  return (
    <PageWrapper active={"Mentor"} title={"Oasis | Be a mentor!"}>
      <MentorHeader />
      {/* <MentorAppsBanner hideLearnMore={true} /> */}
      <MentorBlock />
    </PageWrapper>
  );
}
