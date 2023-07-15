import strings from "@/app/strings";

export default function MentorHeader() {
  return (
    <>
      <h1 className="w-full">{strings.MentorBlock.title}</h1>
      <p>{strings.MentorBlock.body}</p>
    </>
  );
}
