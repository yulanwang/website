import ImageParagraph from "./ImageParagraph";
import OasisImage2 from "../../public/images/OasisCrowd2.png"

export default function MissionBlock() {
  return (
    <ImageParagraph
      title={"Mission"}
      body={
        <>
          At Oasis, we believe in three key values:{" "}
          <b>
            remain open
          </b>
          , teach{" "}
          <b>
            learning to learn
          </b>{" "}
          over learning frameworks, and that the best way to learn is to{" "}
          <b>
            learn by doing
          </b>
          . As such, we teach as many students as we can to build not only their
          first projects, but also the skills they need to tackle their
          subsequent projects.
        </>
      }
      image={OasisImage2}
      placement={"left"}
    />
  );
}
