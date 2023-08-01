"use client";

import React from "react";

import WhyJoin from "../../components/WhyJoin";
import EnrollmentTimeline from "@/components/EnrollmentTimeline";
import JoinFaqs from "@/components/JoinFaqs";
import PageWrapper from "@/components/PageWrapper";
import HackSessionTimeline from "@/components/HackSessionTimeline";

export default function Join() {
  return (
    <PageWrapper active={"Project Series"}>
      <WhyJoin />
      <EnrollmentTimeline />
      <HackSessionTimeline />
      <JoinFaqs />
    </PageWrapper>
  );
}
