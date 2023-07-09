import { useState } from "react";
import JoinFaqQuestion from "./JoinFaqQuestion";
import strings from "@/app/strings";

export default function JoinFaqs() {
  return (
    <div className="w-full sm:mb-0 mb-16">
      <h1>FAQs</h1>
      {strings.JoinFaqs.questions.map(({ q, a }, i) => (
        <div key={i} className="">
          <JoinFaqQuestion question={q} answer={a} />
        </div>
      ))}
    </div>
  );
}
