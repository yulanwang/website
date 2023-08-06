import strings from "@/app/strings";
import Link from "next/link";


export default function SeriesBlock() {
  return (
    <div>
      <div>
        <h1>{strings.AboutBlock.title}</h1>
        <p>{strings.AboutBlock.body}</p>
      </div>
      <div className="w-full my-16 flex items-center justify-center">
        <div className="flex md:flex-row flex-col gap-8 w-full md:items-stretch items-center justify-center">
          <div className="relative rounded-lg bg-oa-green-pastel md:w-1/2 w-full max-w-md p-4 py-6 flex flex-col gap-6 justify-between shadow-md hover:shadow-xl group">
            <div className="absolute top-0 bottom-0 left-0 right-0 bg-gradient-to-br from-oa-extra-light to-oa-green bg-blend-multiply group-hover:animate-pulse opacity-0 group-hover:bg-opacity-25 z-10 rounded-lg transition-all duration-500"></div>
            <div className="z-20">
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
              className="mx-auto ring-2 ring-oa-extra-light rounded-lg shadow-md hover:ring-4 hover:shadow-lg transition-all duration-150 z-20 text-oa-extra-light bg-oa-green p-2 px-4"
            >
              {strings.Series.projectButton}
            </Link>
          </div>
          <div className="relative rounded-lg bg-ex-blue-pastel md:w-1/2 w-full max-w-md p-4 py-6 flex flex-col gap-6 justify-between shadow-md hover:shadow-xl group  transition-all duration-500">
            <div className="absolute top-0 bottom-0 left-0 right-0 bg-gradient-to-br from-oa-extra-light to-ex-blue bg-blend-multiply group-hover:animate-pulse opacity-0 group-hover:bg-opacity-25 z-10 rounded-lg"></div>
            <div className="z-20">
              <h1 className="text-center mb-2 text-ex-dark">{strings.Series.explorer}</h1>
              <p className="font-medium text-left text-ex-blue-dark">
                {strings.Series.explorerBody}
                <br />
                <i className="italic font-normal">
                  {strings.Series.explorerSecondary}
                </i>
              </p>
            </div>
            <Link
              href="/explorer"
              className="mx-auto ring-2 ring-oa-extra-light rounded-lg shadow-md hover:ring-4 hover:shadow-lg transition-all duration-150 z-20 text-oa-extra-light bg-ex-dark p-2 px-4"
            >
              {strings.Series.explorerButton}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
