import OasisTypewriter from "@/components/OasisTypewriter";
import "./Hook.css"
import strings from "@/app/strings";

export default function Hook() {
   return (
      <div className="bg-no-repeat overflow-hidden bg-cover landingPageImage min-h-[360px] h-[70vh] relative">
        <div className="min-h-[360px] h-[70vh] flex flex-col justify-center items-center">
          <div className="w-full min-h-[360px] max-w-[96rem] px-16 flex flex-row items-center justify-start">
            <div className="bottom-1/3 xs:left-10 xs:text-left text-center left-0 right-0 text-oasis-blue">
              <OasisTypewriter />
              <p className="text-2xl px-2 pt-4 text-oasis-blue text-shadow-sm shadow-oasis-light xs:text-left text-center">
                {strings.Hook.tagline}
              </p>
            </div>
          </div>
        </div>
      </div>
    );
}