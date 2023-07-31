import Image from "next/image";
import Link from "next/link";
import strings from "@/app/strings";

export default function FeaturedProjects() {
  return (
    <div className="mt-12 mb-24">
      <h1 className="mb-6">{strings.FeaturedProjects.title}</h1>
      <Link
        href="/projects"
        target="_blank"
        className="p-2 bg-oasis-yellow dark:text-oasis-yellow dark:bg-oasis-extra-dark dark:ring-1 dark:hover:ring-2 dark:ring-oasis-yellow rounded-lg shadow-sm hover:shadow-md hover:ring-2 ring-oasis-extra-light transition-all duration-150 text-oasis-extra-light"
      >
        {strings.FeaturedProjects.button}
      </Link>
      <div className="grid sm:grid-cols-3 gap-6 mt-6">
        {strings.FeaturedProjects.projects.map(
          ({ title, desc, link, src, width, height }, i) => (
            <Link
              className="flex flex-col items-center gap-4 sm:max-w-84 sm:min-w-48 sm:text-left text-center hover:bg-oasis-extra-light hover:bg-oasis-extra-dark hover:shadow-md hover:scale-105 hover:rounded-lg hover:translate-y-5 transition-all duration-200 p-3 rounded-md group"
              key={i}
              href={link}
              target="_blank"
            >
              <Image
                src={src}
                alt={"Image showcasing the project"}
                width={width}
                height={height}
                className="aspect-square object-contain bg-oasis-extra-light dark:bg-oasis-extra-dark rounded-md group-hover:shadow-md"
              />
              <div className="group-hover:bg-oasis-light dark:group-hover:bg-oasis-dark rounded-md p-2">
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
