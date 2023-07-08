import ImageParagraph from "./ImageParagraph";
import OasisImage1 from "../../public/images/OasisCrowd1.png";
import strings from "@/app/strings";

export default function AboutBlock() {
  return (
    <ImageParagraph
      title={strings.AboutBlock.title}
      body={strings.AboutBlock.body}
      image={OasisImage1}
      placement={"right"}
    />
  );
}
