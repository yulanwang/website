import Image from "next/image";
import OasisImage1 from "../../public/images/OasisCrowd1.png";
import OasisImage2 from "../../public/images/OasisCrowd2.png";

export default function HomeAbout() {
   return (
      <div className="bg-oasis-light pt-20" id="about">
        <div className="flex flex-col gap-24">
          <div className="flex flex-row gap-8">
            <div>
              <h1 className="">About</h1>
              <p className="text-xl">
                Oasis helps students learn to build their first website and apps.
                To do this, we pair you with a team and a mentor, and then teach
                you the skills you need through Hack Sessions every Sunday. <br />{" "}
                At each Hack Session you receive a 30-minute workshop, and then
                spend 90 minutes with your team building on your project.
              </p>
            </div>
  
            <Image
              className="shadow-xl object-cover"
              src={OasisImage2}
              alt={"Oasis Hack Session"}
            />
          </div>
          <div className="flex flex-row gap-8">
            <Image
              className="shadow-xl object-cover"
              src={OasisImage1}
              alt={"Oasis Hack Session"}
            />
            <div>
              <h1 className="">Mission</h1>
              <p className="text-xl">
                At Oasis, we believe in three key values:{" "}
                <b className="text-oasis-green underline border-oasis-green">
                  remain open
                </b>
                , teach{" "}
                <b className="text-oasis-green underline border-oasis-green">
                  learning to learn
                </b>{" "}
                over learning frameworks, and that the best way to learn is to{" "}
                <b className="text-oasis-green underline border-oasis-green">
                  learn by doing
                </b>
                . As such, we teach as many students as we can to build not only
                their first projects, but also the skills they need to tackle
                their subsequent projects.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
}