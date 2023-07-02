export default function HackSessionTimeline() {
  return (
    <div className="flex flex-col items-center pt-28">
      <h1 className="">Session by Session</h1>

      <div className="max-w-3xl flex items-center justify-center pb-16">
        <div className="grid grid-cols-9 grid-rows-2">
          <div className="row-start-1 row-end-3 row-span-1 flex items-center justify-center col-start-1 col-end-10">
            <div className="w-full mx-4 h-1 bg-oasis-yellow"></div>
          </div>
          <div className="flex flex-row gap-6 row-start-1 row-end-3 row-span-1 col-start-1 col-end-10">
            {[
              { num: "0", hook: "Git-ing Started" },
              { num: "1", hook: "Shoot Your Shot" },
              { num: "2", hook: "Data for Design" },
              { num: "3", hook: "(API) Call and Response" },
              { num: "4", hook: "Data-BASED" },
              { num: "5", hook: "Mid-Semester Showcase" },
              { num: "6", hook: "Reeling things in" },
              { num: "7", hook: "Mindset to Grindset" },
              { num: "8", hook: "Presentation Preparation" },
              { num: "D", hook: "Demo Day!" },
            ].map(({ num, hook }, i) => (
              <div
                key={i}
                className="flex flex-col items-center justify-center w-28 group relative group"
              >
                <div
                  className={
                    "h-20 text-center whitespace-nowrap absolute top-0 flex flex-col text-sm items-center gap-2 mt-4" +
                    (i % 2 !== 0 ? " hidden " : "")
                  }
                >
                  <span className="group-hover:scale-110 duration-200 transition-all">
                    {hook}
                  </span>
                  <div className="w-[2px] rounded-full h-8 bg-oasis-yellow"></div>
                </div>
                <div
                  className={
                    "rounded-full p-2 w-10 h-10 bg-oasis-extra-light flex items-center justify-center border-0 border-oasis-green shadow-md text-oasis-yellow my-24 group-hover:scale-110 duration-200 transition-all"
                  }
                >
                  {num}
                </div>
                <div
                  className={
                    "h-20 text-center whitespace-nowrap absolute bottom-0 flex flex-col text-sm items-center gap-2 mt-4" +
                    (i % 2 === 0 ? " hidden " : "")
                  }
                >
                  <div className="group-hover:scale-110 duration-200 transition-all w-[2px] rounded-full h-8 bg-oasis-yellow"></div>
                  <span className="group-hover:scale-110 duration-200 transition-all">
                    {hook}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
