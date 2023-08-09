import PageWrapper from "@/components/PageWrapper";
import twMerge from "../../../twMerge";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGit, faGithub, faReact } from "@fortawesome/free-brands-svg-icons";
import Link from "next/link";
import { faFish, faRocket } from "@fortawesome/free-solid-svg-icons";

export default function ExplorerJoin() {
  const events = [
    {
      title: "Hack Session 0: Git Started",
      body: "Cillum eu cillum deserunt non. Aute nostrud nulla qui pariatur. Pariatur magna proident aliqua veniam labore velit in occaecat labore reprehenderit. Incididunt quis eiusmod amet nostrud Lorem adipisicing deserunt consectetur qui veniam enim occaecat qui elit eu.",
      icon: faGithub,
      date: "September 9th, 6-8pm in Cargill 097",
    },
    {
      title: "Full Stack Launchpad",
      body: "Cillum eu cillum deserunt non. Aute nostrud nulla qui pariatur. Pariatur magna proident aliqua veniam labore velit in occaecat labore reprehenderit. Incididunt quis eiusmod amet nostrud Lorem adipisicing deserunt consectetur qui veniam enim occaecat qui elit eu.",
      icon: faRocket,
      date: "October 12th, 6-8pm in 212 WVH",
    },
    {
      title: "Data Science Deep-dive",
      body: "Cillum eu cillum deserunt non. Aute nostrud nulla qui pariatur. Pariatur magna proident aliqua veniam labore velit in occaecat labore reprehenderit. Incididunt quis eiusmod amet nostrud Lorem adipisicing deserunt consectetur qui veniam enim occaecat qui elit eu.",
      icon: faFish,
      date: "November 2nd, 6-8pm in 212 WVH",
    },
  ];

  return (
    <PageWrapper active={"Explorer Series"}>
      {/* I think we should use some major graphic at the start of the explore page to make it clear that it's different */}

      <h1 className="text-ex-blue-dark">Major events, open to all.</h1>
      <div className="flex flex-col gap-8 mt-4 mb-16">
        {events.map(({ title, body, date, icon }, i) => (
          <div
            key={i}
            className={twMerge(
              "flex gap-4 items-start max-w-3xl p-4 bg-ex-blue-pastel bg-opacity-30 shadow-md rounded-lg relative group",
              i % 2 === 0 ? "mr-24" : "ml-24"
            )}
          >
            {i % 2 === 0 ? (
              <div className={i === events.length - 1 ? "hidden" : ""}>
                <div className="absolute translate-x-12 right-0 bottom-0 w-2 h-1/2 bg-ex-orange-pastel flex flex-row-reverse"></div>
                <div className="absolute translate-x-12 translate-y-8 right-0 bottom-0 w-2 h-1/2 bg-ex-orange-pastel flex flex-row-reverse"></div>
                <div className="absolute translate-x-12 right-0 top-1/2 bottom-0 w-12 h-2 bg-ex-orange-pastel flex flex-row-reverse"></div>
              </div>
            ) : (
              <div className={i === events.length - 1 ? "hidden" : ""}>
                <div className="absolute -translate-x-12 left-0 bottom-0 w-2 h-1/2 bg-ex-orange-pastel flex flex-row-reverse"></div>
                <div className="absolute -translate-x-12 translate-y-8 left-0 bottom-0 w-2 h-1/2 bg-ex-orange-pastel flex flex-row-reverse"></div>
                <div className="absolute -translate-x-12 left-0 top-1/2 bottom-0 w-12 h-2 bg-ex-orange-pastel flex flex-row-reverse"></div>
              </div>
            )}
            <div className="rounded-lg absolute top-0 bottom-0 right-0 left-0 bg-gradient-to-tr from-ex-blue to-oa-extra-light opacity-10 group-hover:opacity-20 transition-all duration-500"></div>
            <div className="rounded-md shadow-md bg-oa-light p-4 flex-1 h-full z-10">
              <FontAwesomeIcon
                className="h-16 w-24 text-ex-orange-pastel drop-shadow-sm outline-1 outline-ex-orange-pastel"
                icon={icon}
              />
            </div>
            <div className="flex flex-col z-10">
              <h3 className="text-ex-dark">{title}</h3>
              <p className="text-ex-blue-dark">{body}</p>
              <div className="text-oa-dark italic p-2 bg-oa-light rounded-full px-4 mt-4 w-fit shadow-sm">
                {date}
              </div>
            </div>
          </div>
        ))}
      </div>
      <h1 className="text-ex-blue-dark mb-4">
        Built with{" "}
        <span className="relative">
          <Link
            target="_blank"
            className="text-ex-blue relative"
            href="/resources"
          >
            Resources
          </Link>
          <div className="absolute left-0 right-0 h-[0.3rem] -translate-y-2 rounded-full bg-ex-blue bottom-0"></div>
        </span>{" "}
        in mind
      </h1>
      <p>
        Sessions are designed to set you up for success on your own. Learn the
        basics, and then use async resources to continue your journey. Our
        tailor-made resources match up with presentations and provide
        supplemental materials for you to reference long afterwards.
      </p>
    </PageWrapper>
  );
}
