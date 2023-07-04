import ImageParagraph from "./ImageParagraph";
import OasisImage1 from "../../public/images/OasisCrowd1.png"

export default function AboutBlock() {
  return (
    <ImageParagraph
      title={"What's Oasis?"}
      body={
        <>
          Oasis helps students learn to build their first website and apps. To
          do this, we pair you with a team and a mentor, and then teach you the
          skills you need through Hack Sessions every Sunday. At each Hack
          Session you receive a 30-minute workshop, and then spend 90 minutes
          with your team building on your project.
        </>
      }
      image={OasisImage1}
      placement={"right"}
    />
  );
}
