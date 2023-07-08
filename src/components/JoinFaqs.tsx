import { useState } from "react";
import JoinFaqQuestion from "./JoinFaqQuestion";
import strings from "@/app/strings";

export default function JoinFaqs() {
  return (
    <div className="w-full">
      <h1>FAQs</h1>
      {strings.JoinFaqs.questions.map(({ q, a }, i) => (
        <div key={i}>
          <JoinFaqQuestion question={q} answer={a} />
        </div>
      ))}
    </div>
  );
}
