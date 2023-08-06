import OasisTypewriter from "@/components/OasisTypewriter";
import "./Hook.css";
import strings from "@/app/strings";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowDown } from "@fortawesome/free-solid-svg-icons";

interface Props {
  scrollJump: () => void
}

export default function Hook({scrollJump}: Props) {
  return (
    <div className="bg-no-repeat overflow-hidden bg-cover landingPageImage min-h-[360px] h-[80vh] relative">
      <div className="absolute top-0 bottom-0 right-0 left-0 z-0 flex flex-col items-center justify-end">
        <button onClick={scrollJump} className="flex flex-row gap-2 items-center justify-center cursor-pointer p-4 text-oa-light drop-shadow-md hover:drop-shadow-lg animate-pulse hover:animate-none transition-all duration-300">
          Scroll for more{" "}
          <FontAwesomeIcon className={""} icon={faArrowDown} />
        </button>
      </div>
      <div className="min-h-[360px] h-[80vh] flex flex-col justify-center items-center z-10">
        <div className="w-full min-h-[360px] max-w-[96rem] px-16 flex flex-row items-center justify-start">
          <div className="bottom-1/3 xs:left-10 xs:text-left text-center left-0 right-0 text-oa-blue">
            <OasisTypewriter />
            <p className="text-2xl px-2 pt-4 text-oa-blue text-shadow-sm shadow-oa-light xs:text-left text-center">
              {strings.Hook.tagline}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
