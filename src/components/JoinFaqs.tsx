import { useState } from "react";
import JoinFaqQuestion from "./JoinFaqQuestion";

export default function JoinFaqs() {
  return (
    <div className="w-full">
      <h1>FAQs</h1>
      {[
        {
          q: "How do you assess applications?",
          a: "We don't asses them in the traditional sense. We pride ourselves on being open to students from all backgrounds and experience levels, so our application is first-come first-serve to keep it simple and fair for everybody.",
        },
        {
          q: "How many students are in a normal cohort?",
          a: "A typical semester is roughly 80 students. We target 10 mentors each semester, and each mentor works with two groups of four students each.",
        },
        {
          q: "Do I have to be at the Info Session?",
          a: "Sort of. We don't require you come to the Info Session, but we would like to warn that it's highly unlikely you'll be able to reserve a spot if you're not because we open Registration at the Info Session.",
        },
      ].map(({ q, a }, i) => (
        <div key={i}>
          <JoinFaqQuestion question={q} answer={a} />
        </div>
      ))}
    </div>
  );
}
