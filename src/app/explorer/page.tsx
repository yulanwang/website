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
      date: "September 9th, 6-8pm | Cargill 097"
    },
    {
      title: "Full Stack Launchpad",
      body: "Cillum eu cillum deserunt non. Aute nostrud nulla qui pariatur. Pariatur magna proident aliqua veniam labore velit in occaecat labore reprehenderit. Incididunt quis eiusmod amet nostrud Lorem adipisicing deserunt consectetur qui veniam enim occaecat qui elit eu.",
      icon: faRocket,
      date: "October 12th, 6-8pm | 212 WVH"
    },
    {
      title: "Data Science Deep-dive",
      body: "Cillum eu cillum deserunt non. Aute nostrud nulla qui pariatur. Pariatur magna proident aliqua veniam labore velit in occaecat labore reprehenderit. Incididunt quis eiusmod amet nostrud Lorem adipisicing deserunt consectetur qui veniam enim occaecat qui elit eu.",
      icon: faFish,
      date: "November 2nd, 6-8pm | 212 WVH"
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
              "flex gap-4 items-center max-w-3xl p-4 bg-ex-blue-pastel shadow-md rounded-lg",
              i % 2 === 0 ? "flex-row" : "flex-row-reverse"
            )}
          >
            <div className="rounded-md shadow-md bg-oa-light p-4 flex-1 h-full">
              <FontAwesomeIcon className="h-24 w-24 text-ex-orange-pastel drop-shadow-sm outline-1 outline-ex-orange-pastel" icon={icon} />
            </div>
            <div className="flex flex-col">
              <h3 className="text-ex-dark">{title}</h3>
              <p className="text-ex-blue-dark">{body}</p>
              <div className="text-oa-dark italic p-2 bg-oa-light rounded-full px-4 mt-4 w-fit shadow-sm">{date}</div>
            </div>
          </div>
        ))}
      </div>
      <h1 className="text-ex-blue-dark mb-4">Built with <span className="relative"><Link target="_blank" className="text-ex-blue relative" href="/resources">Resources</Link><div className="absolute left-0 right-0 h-[0.3rem] -translate-y-2 rounded-full bg-ex-blue bottom-0"></div></span> in mind</h1>
      <p>Sessions are designed to set you up for success on your own. Learn the basics, and then use async resources to continue your journey. Our tailor-made resources match up with presentations and provide supplemental materials for you to reference long afterwards.</p>
    </PageWrapper>
  );
}
