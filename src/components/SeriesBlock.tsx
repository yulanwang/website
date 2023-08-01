import strings from "@/app/strings";
import {
  faLightbulb,
  faProjectDiagram,
  faRocket,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";

export default function SeriesBlock() {
  return (
    <div className="w-full my-16 flex items-center justify-center">
      <div className="flex md:flex-row flex-col gap-8 w-full md:items-stretch items-center justify-center">
        <div className="rounded-lg bg-oa-green-pastel md:w-1/2 w-full max-w-md p-4 py-6 flex flex-col gap-6 justify-between shadow-md">
          <div>
            <h1 className="text-center mb-2">{strings.Series.project}</h1>
            <p className="font-medium text-left text-oa-green">
              {strings.Series.projectBody}
              <br />
              <i className="italic font-normal">
                {strings.Series.projectSecondary}
              </i>
            </p>
          </div>
          <Link
            href="/join"
            className="mx-auto ring-2 ring-oa-extra-light rounded-lg shadow-md hover:ring-4 hover:shadow-lg transition-all duration-150 text-oa-extra-light bg-oa-green p-2 px-4"
          >
            {strings.Series.projectButton}
          </Link>
        </div>
        <div className="rounded-lg bg-ex-blue-pastel md:w-1/2 w-full max-w-md p-4 py-6 flex flex-col gap-6 justify-between shadow-md">
          <div className="/join/explore">
            <h1 className="text-center text-ex-dark mb-4">{strings.Series.explorer}</h1>
            <p className="font-medium text-left text-ex-blue-dark">
              {strings.Series.explorerBody}
              <br />
              <i className="italic font-normal">
                {strings.Series.explorerSecondary}
              </i>
            </p>
          </div>
          <a
            href="/join/explore"
            className="mx-auto ring-2 ring-oa-extra-light rounded-lg shadow-md hover:ring-4 hover:shadow-lg transition-all duration-150 text-oa-extra-light bg-ex-dark p-2 px-4"
          >
            {strings.Series.explorerButton}
          </a>
        </div>
      </div>
    </div>
  );
}
