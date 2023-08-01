import {
  faLightbulb,
  faProjectDiagram,
  faRocket,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function SeriesBlock() {
  return (
    <div className="w-full my-16 flex items-center justify-center">
      <div className="flex md:flex-row flex-col gap-4 w-full items-stretch">
        <div className="rounded-lg bg-oa-green-pastel w-1/2 p-4 py-6 flex flex-col gap-6 justify-between">
          <div>
            <h1 className="text-center mb-2">Project Series</h1>
            <p className="font-medium text-left text-oa-green">
              A semester-long curriculum to help you build your first full-stack
              project!
              <br />
              <i className="italic font-normal">
                Join the cohort at the start of each semester.
              </i>
            </p>
          </div>
          <a href="/join" className="mx-auto ring-2 ring-oa-extra-light rounded-lg shadow-md hover:ring-4 hover:shadow-xl transition-all duration-150 text-oa-extra-light bg-oa-green p-2 px-4">
            Learn More
          </a>
        </div>
        <div className="rounded-lg bg-ex-blue-pastel w-1/2 p-4 py-6 flex flex-col gap-6 justify-between">
          <div className="/join/explore">
            <h1 className="text-center text-ex-dark mb-4">Explorer Series</h1>
            <p className="font-medium text-left text-ex-blue-dark">
              Workshops, employer events, networking, and more!
              <br />
              <i className="italic font-normal">
                Open to all, no application required.
              </i>
            </p>
          </div>
          <a href="/join/explore" className="mx-auto ring-2 ring-oa-extra-light rounded-lg shadow-md hover:ring-4 hover:shadow-xl transition-all duration-150 text-oa-extra-light bg-ex-dark p-2 px-4">
            Learn More
          </a>
        </div>
      </div>
    </div>
  );
}
