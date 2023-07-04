export default function EnrollmentTimeline() {
  return (
    <div className="pt-20 w-full">
      <h1>Enrollment Timeline</h1>
      <p>
        Each semester we welcome a new cohort of students. We're limited in how
        many students we can accept due to a limited number of available
        mentors. This process is subject to change each semester, but this is
        the typical series of events.
      </p>
      <p className="mt-1">
        <b>
          Acceptance is is first-come-first-serve; it is not based on your
          abilities or background.
        </b>
      </p>
      <div className="relative border-l border-oasis-light my-4 grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8 mb-12">
        {[
          {
            num: "1",
            tag: "Info Session + Registration",
            time: "1st Sunday of the semester",
            desc: "Learn more about what Oasis is, our Hack Session timeline, new changes for this year, and meet our Eboard. At the end of the Info Session, Registration will open. It's unlikely you'll be able to join if you're not at the Info Session.",
          },
          {
            num: "2",
            tag: "Confirmation",
            time: "Within a week after the Info Session",
            desc: "If you've registered and we have a space available for you, you'll receive a form to complete in order to confirm your spot as a Participant for the coming semester. Completing this form reserves your space.",
          },
          {
            num: "3",
            tag: "Hack Session 0 (open to all!)",
            time: "2nd Sunday of the semester",
            desc: "Hack Session 0 is our Git and React basics workshop. It's open to all students, regardless of Enrollment status, and is a great way to launch your web development journey!",
          },
          {
            num: "4",
            tag: "Hack Sessions begin",
            time: "3rd Sunday of the Semester",
            desc: "Once the enrollment process is complete weekly Sunday Hack Sessions begin. Unfortunately, attendance at Hack Sessions is restricted to accepted students only. For students still looking to get involved, we host Explore Events roughly once a month.",
          },
        ].map(({ num, tag, time, desc }, i) => (
          <div className="relative ml-8">
            <div className="absolute ring-[3px] -translate-x-7 translate-y-[0.2rem] ring-oasis-extra-light bg-oasis-yellow-pastel h-5 w-5 rounded-full flex items-center justify-center text-xs text-oasis-blue">
              {num}
            </div>
            <h3 className="flex items-center mb-1 text-lg font-semibold">{tag}</h3>
            <time className="block mb-2 text-sm font-normal leading-none text-oasis-gray">
              {time}
            </time>
            <p className="mb-4 text-base font-normal text-oasis-blue">{desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
