import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBridge } from "@fortawesome/free-solid-svg-icons";
import { faUserGroup } from "@fortawesome/free-solid-svg-icons";
import { faRocket } from "@fortawesome/free-solid-svg-icons";
import strings from "@/app/strings";

export default function WhyJoin() {
  return (
    <div className="w-full">
      <h1>{strings.WhyJoin.title}</h1>
      <p>
        {strings.WhyJoin.tagline}
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full pt-16">
        {[
          {
            icon: <FontAwesomeIcon className="text-oasis-extra-light text-3xl" icon={faBridge} />,
            head: "Bridge the gap between classes and co-op.",
            body: "Learn co-op applicable skills, not taught in everyday coursework.",
          },
          {
            icon: <FontAwesomeIcon className="text-oasis-extra-light text-3xl" icon={faUserGroup} />
          ,
            head: "Designed for all backgrounds.",
            body: "We have the resources to get you started, no matter your experience level.",
          },
          {
            icon: <FontAwesomeIcon className="text-oasis-extra-light text-3xl" icon={faRocket} />,
            head: "Extracurricular Launchpad!",
            body: "Build relationships with your team, mentors, other clubs, and employers through networking events.",
          },
        ].map(({ icon, head, body }, i) => (
          <div
            className="flex flex-col items-center gap-4 sm:max-w-84 sm:min-w-48 sm:text-left text-center"
            key={i}
          >
            <div className="h-16 w-16 rounded-full bg-oasis-yellow-pastel ring-8 ring-oasis-extra-light shadow-lg mb-2 flex items-center justify-center">{icon}</div>
            <div>
              <h3 className="text-xl">{head}</h3>
              <p className="text-lg">{body}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
