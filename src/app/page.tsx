"use client";

import React, { useRef } from "react";
import Hook from "@/components/Hook";
import PageWrapper from "@/components/PageWrapper";
import SeriesBlock from "@/components/SeriesBlock";
import MissionBlock from "@/components/MissionBlock";
import Eboard from "@/components/Eboard";
import HistoryBlock from "@/components/HistoryBlock";
import InfoSessionBanner from "@/components/InfoSessionBanner";

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
          {/* <InfoSessionBanner /> */}
          <SeriesBlock />
          <MissionBlock />
          <HistoryBlock />
          <Eboard />
        </PageWrapper>
      </div>
    </>
  );
}
