import PageWrapper from "@/components/PageWrapper";
import twMerge from "../../../twMerge";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGit, faGithub, faReact } from "@fortawesome/free-brands-svg-icons";
import Link from "next/link";
import { faFish, faRocket } from "@fortawesome/free-solid-svg-icons";
import strings from "../strings";

export default function ExplorerJoin() {
  const events = [
    {
      title: "Hack Session 0: Git Started",
      body: "Learn the foundational basics of Git and React so you can build websites collaboratively with a team, either as part of the Project Series or on your own with the help of our Resources.",
      icon: faGithub,
      date: "September 17th, 12-2pm; location TBA",
      redacted: false
    },
    {
      title: "Full Stack Launchpad",
      body: "Build on your Hack Session 0 foundations with more advanced React knowledge, an intro to databases, intro to APIs, and share your projects with others after learning about deployment!",
      icon: faRocket,
      date: "October 12th, 6-8pm; location TBA",
      redacted: true
    },
    {
      title: "Data Science Deep-dive",
      body: "Cillum eu cillum deserunt non. Aute nostrud nulla qui pariatur. Pariatur magna proident aliqua veniam labore velit in occaecat labore reprehenderit. Incididunt quis eiusmod amet nostrud Lorem adipisicing deserunt consectetur qui veniam enim occaecat qui elit eu.",
      icon: faFish,
      date: "November 2nd, 6-8pm; location TBA",
      redacted: true
    },
  ];

  return (
    <PageWrapper active={"Explorer Series"}>
      {/* I think we should use some major graphic at the start of the explore page to make it clear that it's different */}

      <h1 className="text-ex-blue-dark">Major events, open to all.</h1>
      <div className="flex flex-col gap-8 mt-4 mb-16">
        {events.map(({ title, body, date, icon, redacted }, i) => (
          <div
            key={i}
            className={twMerge(
              "flex gap-0 md:flex-row flex-col w-full items-start max-w-3xl p-4 bg-ex-blue-pastel bg-opacity-30 shadow-md rounded-lg relative group -ml-0",
              i % 2 === 0 ? "md:mr-24 mr-12" : "md:ml-24 ml-0"
            )}
          >
            {i % 2 === 0 ? (
              <div className={i === events.length - 1 ? "hidden" : "md:block hidden"}>
                <div className="absolute translate-x-4 md:translate-x-12 right-0 bottom-0 w-2 h-1/2 bg-ex-orange-pastel flex flex-row-reverse"></div>
                <div className="absolute translate-x-4 md:translate-x-12 translate-y-8 right-0 bottom-0 w-2 h-1/2 bg-ex-orange-pastel flex flex-row-reverse"></div>
                <div className="absolute translate-x-4 md:translate-x-12 right-0 top-1/2 bottom-0 w-4 md:w-12 h-2 bg-ex-orange-pastel flex flex-row-reverse"></div>
              </div>
            ) : (
              <div className={i === events.length - 1 ? "hidden" : "md:block hidden"}>
                <div className="absolute -translate-x-4 md:-translate-x-12 left-0 bottom-0 w-2 h-1/2 bg-ex-orange-pastel flex flex-row-reverse"></div>
                <div className="absolute -translate-x-4 md:-translate-x-12 translate-y-8 left-0 bottom-0 w-2 h-1/2 bg-ex-orange-pastel flex flex-row-reverse"></div>
                <div className="absolute -translate-x-4 md:-translate-x-12 left-0 top-1/2 bottom-0 md:w-12 w-4 h-2 bg-ex-orange-pastel flex flex-row-reverse"></div>
              </div>
            )}
            <div className="rounded-lg absolute top-0 bottom-0 right-0 left-0 bg-gradient-to-tr from-ex-blue to-oa-extra-light opacity-[15%] group-hover:opacity-20 transition-all duration-50"></div>
            <div className="rounded-md shadow-md bg-oa-light p-4 z-10 md:mb-0 mb-4">
              <FontAwesomeIcon
                className="h-16 w-24 text-ex-orange drop-shadow-sm"
                icon={icon}
              />
            </div>
            <div className="flex flex-col z-10 w-full flex-1 md:pl-4">
              <h3 className="text-ex-dark">{title}</h3>
              {!redacted && <p className="text-ex-blue-dark">{body}</p>}
              <div className="text-oa-dark italic p-2 bg-oa-light rounded-full px-4 mt-4 w-fit shadow-sm">
                {date}
              </div>
            </div>
          </div>
        ))}
      </div>
      <h1 className="text-ex-blue-dark mb-4">
        Built with{" "}
        <span className="relative group hover:drop-shadow-xl">
          <Link
            target="_blank"
            className="text-ex-blue relative group-hover:text-red-500  transition-all duration-150"
            href="/resources"
          >
            Resources
          </Link>
          <div className="absolute left-0 right-0 h-[0.3rem] -translate-y-2 rounded-full bg-ex-blue  group-hover:bg-red-500 group-hover:drop-shadow-md transition-all duration-150 bottom-0"></div>
        </span>{" "}
        in mind
      </h1>
      <p className="mb-12 max-w-3xl">
        Sessions are designed to set you up for success on your own. Learn the
        basics, and then use async resources to continue your journey. Our
        tailor-made resources match up with presentations and provide
        supplemental materials for you to reference long afterwards.
      </p>
      <h1 className="text-ex-blue-dark mb-4">By the numbers</h1>
      <div className="max-w-3xl grid grid-rows-2 grid-cols-1 sm:grid-cols-3 md:grid-rows-1 gap-8 items-center justify-center">
        {[{count: 91, content: "HS0 Attendees"}, {count: 32, content: "Resource Pages"}, {count: 5, content: "Topic Areas"}].map((obj, i) => (
          <div
            key={i}
            className="bg-oa-extra-light rounded-3xl flex flex-col items-center justify-center max-w-md w-full p-4 h-48 shadow-md"
          >
            <h2 className="text-ex-orange text-6xl mb-2">{obj.count}</h2>
            <p className="text-oa-gray text-center">{obj.content}</p>
          </div>
        ))}
      </div>
    </PageWrapper>
  );
}
