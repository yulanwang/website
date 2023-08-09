import { useState } from "react";

type Props = {
  question: string;
  answer: string;
};

export default function JoinFaqQuestion({ question, answer }: Props) {
  {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <div className="border-t-2 border-oa-green-pastel pt-4 pb-2">
        <button
          onClick={() => {
            setIsOpen(!isOpen);
          }}
          className="w-full flex flex-row justify-between items-center"
        >
          <h4 className="text-xl text-left">{question}</h4>{" "}
          <div className="relative w-10 h-10 flex items-center justify-center">
            <div
            data-isOpen={isOpen}
              className={
                "absolute flex justify-center items-center top-0 left-0 w-full text-oa-green-pastel transition-all duration-300 data-[isOpen=true]:opacity-0 data-[isOpen=true]:rotate-180"
              }
            >
              +
            </div>
            <div
            data-isOpen={isOpen}
              className={
                "absolute flex justify-center items-center top-0 left-0 w-full -translate-y-[1.5px] scale-x-150 text-oa-green-pastel transition-all duration-300 data-[isOpen=false]:opacity-0 data-[isOpen=false]:rotate-270"
              }
            >
              -
            </div>
          </div>
        </button>
        <p
        data-isOpen={isOpen}
          className={
            "text-lg pt-2 transition-all duration-300 text-oa-blue data-[isOpen=false]:scale-y-0 data-[isOpen=false]:opacity-0 data-[isOpen=false]:max-h-0 max-h-[180px] data-[isOpen=true]:pb-4 origin-top"
          }
        >
          {answer}
        </p>
      </div>
    );
  }
}
