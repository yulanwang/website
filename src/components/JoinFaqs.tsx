import { useState } from "react";

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
            a: "A typical semester is roughly 80 students. We target 10 mentors each semester, and each mentor takes two groups of four students each.",
          },
        ].map(({ q, a }, i) => {
          const [isOpen, setIsOpen] = useState(false);
  
          return (
            <div
              key={i}
              className="border-t-2 border-oasis-green-pastel py-4"
            >
              <button onClick={() => {setIsOpen(!isOpen)}} className="w-full flex flex-row justify-between items-center">
                <h4 className="text-xl">{q}</h4> {/* // TODO: do scaling and rotating when rotating up and down  */}
                <div className="relative w-10 h-10 flex items-center justify-center">
                  <div className="absolute flex justify-center items-center top-0 left-0 w-full text-oasis-green-pastel">+</div>
                  <div className="absolute flex justify-center items-center top-0 left-0 w-full -translate-y-[1.5px] scale-x-150 text-oasis-green-pastel">-</div>
                </div>
                {/* <p className={"px-2 transition-all duration-300 text-oasis-green-pastel" + (isOpen ? " rotate-180 " : " ")}>{isOpen ? "-" : "+"}</p> */}
              </button>
              <p className={"text-lg pt-2 transition-all duration-300 text-oasis-blue" + (isOpen ? "" : " scale-y-0 h-0 opacity-0 ")}>{a}</p>
            </div>
          );
        })}
      </div>
    );
}