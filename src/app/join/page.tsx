"use client";

import React from "react";

import WhyJoin from "../../components/WhyJoin";
import EnrollmentTimeline from "@/components/EnrollmentTimeline";
import JoinFaqs from "@/components/JoinFaqs";
import PageWrapper from "@/components/PageWrapper";

export default function Join() {
  return (
    <PageWrapper>
      <WhyJoin />
      <EnrollmentTimeline />
      <JoinFaqs />
    </PageWrapper>
  );
}
