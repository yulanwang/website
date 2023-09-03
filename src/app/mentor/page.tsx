"use client";

import React from "react";

import PageWrapper from "@/components/PageWrapper";
import MentorBlock from "@/components/MentorBlock";
import MentorHeader from "@/components/MentorHeader";
import BannerCard from "@/components/BannerCard";
import EmailSignup from "@/components/EmailSignup";
import Link from "next/link";

export default function Mentor() {
  return (
    <PageWrapper active={"Mentor"} title={"Oasis | Be a mentor!"}>
      <MentorHeader />
      {/* <MentorAppsBanner hideLearnMore={true} /> */}
      <BannerCard title={""} buttons={[]}>
        Mentor applications are currently closed. Please feel free to reach out
        with questions by emailing{" "}
        <Link href="mailto:oasisneu@gmail.com">
          <b>oasisneu@gmail.com</b>
        </Link>
        , and stay up to date by signing up for our mailing list.
        <EmailSignup purpose={"websiteMentorAppsClosed"} />
      </BannerCard>
      <MentorBlock />
    </PageWrapper>
  );
}
