import ImageParagraph from "./ImageParagraph";
import KickoffFlyer from "../../public/images/kick off flyer.png"

export default function HistoryBlock() {
  return (
    <ImageParagraph
      title={"History"}
      body={
        <>
          Oasis was founded in the Fall of 2020 as a Sandbox program. Originally
          it was just a series of virtual workshops which had time for people to
          network afterwards. Over time, it's evolved into the project
          accelerator and larger organization it is today and become an
          independent club in Spring 2023.
        </>
      }
      image={KickoffFlyer}
      placement={"right"}
    />
  );
}
