import strings from "@/app/strings";
import Image from "next/image";

export default function Eboard() {
  return (
    <div className="w-full pt-20">
      <h1 className="">{strings.Eboard.title}</h1>
      <div className="grid md:grid-cols-4 sm:grid-cols-3 grid-cols-2 gap-8">
        {strings.Eboard.members.map(({ name, role, src }, i) => (
          <div key={i} className="flex flex-col items-center">
            <Image
              className="rounded-md shadow-md mb-2"
              src={src}
              alt={"Profile Image for " + name}
              width={160}
              height={160}
            />
            <h3>{name}</h3>
            <p>{role}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
