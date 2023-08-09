import strings from "@/app/strings";
import parse from "html-react-parser";

export default function MentorHeader() {
  return (
    <>
      <h1 className="w-full">{strings.MentorBlock.title}</h1>
      <p className="space-y-8">{parse(strings.MentorBlock.body.replace("\n", "<br />"))}</p>
    </>
  );
}
