import Image from "next/image";
import Link from "next/link";
import strings from "@/app/strings";

export default function FeaturedProjects() {
  return (
    <div className="mt-24 mb-24">
      <h1 className="mb-6">{strings.FeaturedProjects.title}</h1>
      <Link
        href="/projects"
        target="_blank"
        className="p-2 bg-oa-yellow rounded-lg shadow-sm hover:shadow-md hover:ring-2 ring-oa-extra-light transition-all duration-150 text-oa-extra-light"
      >
        {strings.FeaturedProjects.button}
      </Link>
      <div className="grid sm:grid-cols-3 gap-6 mt-6">
        {strings.FeaturedProjects.projects.map(
          ({ title, desc, link, src, width, height }, i) => (
            <Link
              className="flex flex-col items-center gap-4 sm:max-w-84 sm:min-w-48 sm:text-left text-center hover:bg-oa-extra-light hover:shadow-md hover:scale-105 transition-all duration-200 p-3 rounded-md group"
              key={i}
              href={link}
              target="_blank"
            >
              <Image
                src={src}
                alt={"Image showcasing the project"}
                width={width}
                height={height}
                className="aspect-square object-contain bg-oa-extra-light rounded-md group-hover:shadow-md"
              />
              <div className="group-hover:bg-oa-light flex-1 rounded-md p-2">
                <h3 className="text-xl">{title}</h3>
                <p className="text-lg">{desc}</p>
              </div>
            </Link>
          )
        )}
      </div>
    </div>
  );
}
