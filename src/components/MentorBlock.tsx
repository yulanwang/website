import strings from "@/app/strings";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function MentorBlock() {
  return (
    <>
      <h1 className="w-full">{strings.MentorBlock.title}</h1>
      <p>
        {strings.MentorBlock.body}
      </p>
      <div className="grid md:grid-cols-2 md:grid-rows-2 grid-rows-4 grid-cols-1 gap-8 mt-8">
        {strings.MentorBlock.points.map(({ title, tagline }, i) => (
          <div
            className="flex flex-row items-start justify-start gap-4"
            key={i}
          >
            <FontAwesomeIcon
              className="p-2 bg-oasis-green-pastel ring-4 ring-oasis-extra-light h-4 w-4 flex items-center justify-center rounded-full text-oasis-green"
              icon={faCheck}
            />
            <div>
              <h3>{title}</h3>
              <p>{tagline}</p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
