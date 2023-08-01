import strings from "@/app/strings";

export default function EnrollmentTimeline() {
  return (
    <div className="pt-20 w-full">
      <h1>{strings.EnrollmentTimeline.title}</h1>
      <p>{strings.EnrollmentTimeline.body}</p>
      <p className="mt-1">
        <b>{strings.EnrollmentTimeline.headline}</b>
      </p>
      <div className="relative border-l border-oa-light my-4 grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8 mb-12">
        {strings.EnrollmentTimeline.steps.map(({ num, tag, time, desc }, i) => (
          <div className="relative ml-8" key={i}>
            <div className="absolute ring-[3px] -translate-x-7 translate-y-[0.2rem] ring-oa-extra-light bg-oa-yellow-pastel h-5 w-5 rounded-full flex items-center justify-center text-xs text-oa-blue">
              {num}
            </div>
            <h3 className="flex items-center mb-1 text-lg font-semibold">
              {tag}
            </h3>
            <time className="block mb-2 text-sm font-normal leading-none text-oasis-gray">
              {time}
            </time>
            <p className="mb-4 text-base font-normal text-oa-blue">{desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
