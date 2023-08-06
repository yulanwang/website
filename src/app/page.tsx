"use client";

import React, { useRef } from "react";
import Hook from "@/components/Hook";
import PageWrapper from "@/components/PageWrapper";
import MentorAppsBanner from "@/components/MentorAppsBanner";
import SeriesBlock from "@/components/SeriesBlock";
import MissionBlock from "@/components/MissionBlock";
import Eboard from "@/components/Eboard";
import HistoryBlock from "@/components/HistoryBlock";

export default function Home() {
  const ref = useRef<HTMLDivElement>(null);

  return (
    <>
      <Hook
        scrollJump={() => {
          if (ref.current) {
            ref.current.scrollIntoView({ behavior: "smooth", block: "start" });
          }
        }}
      />
      <div ref={ref}>
        <PageWrapper active="Home">
          <MentorAppsBanner />
          <SeriesBlock />
          <MissionBlock />
          <HistoryBlock />
          <Eboard />
        </PageWrapper>
      </div>
    </>
  );
}
