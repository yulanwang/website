import ImageParagraph from "./ImageParagraph";
import KickoffFlyer from "../../public/images/flyer.png";
import strings from "@/app/strings";

export default function HistoryBlock() {
  return (
    <ImageParagraph
      title={strings.HistoryBlock.title}
      body={strings.HistoryBlock.body}
      image={KickoffFlyer}
      placement={"right"}
    />
  );
}
