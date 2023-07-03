import OasisTypewriter from "@/components/OasisTypewriter";
import "./Hook.css"

export default function Hook() {
   return (
      <div className="bg-no-repeat overflow-hidden bg-cover landingPageImage min-h-[360px] h-[70vh] relative">
        <div className="animatedScrollContainer scrollAnimationComplete stickToParentEnd min-h-[360px] h-[70vh] flex flex-col justify-center items-center">
          <div className="w-full min-h-[360px] max-w-[96rem] px-16 flex flex-row items-center justify-start">
            <div className="textSplash bottom-1/3 left-10 text-oasis-blue">
              <OasisTypewriter />
              <p className="text-2xl pl-2 pt-4 text-oasis-blue text-shadow-sm shadow-oasis-light">
                Ready to make your ideas reality?
              </p>
            </div>
          </div>
        </div>
      </div>
    );
}