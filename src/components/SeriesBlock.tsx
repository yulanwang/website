import {
  faLightbulb,
  faProjectDiagram,
  faRocket,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function SeriesBlock() {
  return (
    <div className="w-full mt-8 mb-20">
      <h1>Our Programs</h1>
      <div className="flex flex-col w-full translate-y-4">
        <div className="place-self-start p-4 bg-oasis-green-pastel rounded-lg w-3/5 origin-bottom-left rotate-2 hover:rotate-1 transition-all duration-150 gap-2 flex flex-col translate-y-10 shadow-md hover:shadow-xl -my-10 hover:z-40 hover:-translate-x-8 ring-4 hover:bg-opacity-90 ring-oasis-extra-light">
          <h1 className="">
            <span>
              <FontAwesomeIcon
                className="scale-75 not-italic"
                icon={faLightbulb}
              />
            </span>{" "}
            Project Series
          </h1>
          <p className="font-medium">
            A semester-long curriculum to help you build your first full-stack
            project!
            <br />
            <i className="italic font-light">
              Join the cohort at the start of each semester.
            </i>
          </p>
          <button className="p-2 rounded-md shadow-md hover:shadow-xl ring-2 ring-oasis-extra-light hover:ring-4 transition-all duration-200  w-full max-w-[8rem] bg-gradient-to-b from-oasis-green hover:from-oasis-green-pastel hover:to-oasis-green to-oasis-green text-white">
            Apply now
          </button>
        </div>
        <div className="place-self-end p-4 bg-sky-200 rounded-lg w-3/5 my-4 origin-top-right -rotate-2 hover:shadow-xl shadow-md hover:-rotate-1 transition-all duration-150 gap-4 flex flex-col group -translate-y-0 hover:-translate-y-1 hover:translate-x-6 ring-4 ring-oasis-extra-light hover:bg-opacity-90">
          <h1 className="text-sky-600">
            <span>
              <FontAwesomeIcon
                className="scale-75 not-italic"
                icon={faRocket}
              />
            </span>{" "}
            Explore Series
          </h1>
          <p className="font-medium">
            Workshops, employer events, networking, and more!
            <br />
            <i className="italic font-light">
              Open to all, no application required.
            </i>
          </p>
          <button className="p-2 rounded-md shadow-md hover:shadow-xl ring-2 ring-oasis-extra-light hover:ring-4 bg-gradient-to-b from-sky-600  group-hover:from-sky-500 to-sky-600 transition-all duration-200 w-full max-w-[8rem] bg-sky-600 text-white">
            Next event
          </button>
        </div>
      </div>
    </div>
  );
}
