import Marino from "../../public/images/Projects/HowBusyIsMarino.png";
import RoomieHub from "../../public/images/Projects/RoomieHub.png";
import TransitNU from "../../public/images/Projects/TransitNU.png";

import Image from "next/image";
import Link from "next/link";

export default function FeaturedProjects() {
   return (
      <div className="mt-12 mb-24">
        <h1 className="mb-6">Featured Projects</h1>
        <Link
          href="https://hub.oasisneu.com/"
          target="_blank"
          className="p-2 bg-oasis-yellow rounded-lg shadow-sm hover:shadow-md hover:ring-2 ring-oasis-extra-light transition-all duration-150 text-oasis-extra-light"
        >
          See All Projects
        </Link>
        <div className="grid sm:grid-cols-3 gap-6 mt-6">
          {[
            {
              title: "How Busy is Marino",
              desc: "Rollup Marino activity over time into graphical predictions for future capacity at Marino!",
              link: "https://hub.oasisneu.com/806c07c8bcd142219a01f88015b67497",
              src: Marino,
            },
            {
              title: "Roomie Hub",
              desc: "The essential tool to track chores, groceries, schedules, and more with your roommate!",
              link: "https://hub.oasisneu.com/664267296b84424a97e18944eadf74d4",
              src: RoomieHub,
            },
            {
              title: "TransitNU",
              desc: "Help students track the locations of MBTA trains in and around Boston using their API.",
              link: "https://hub.oasisneu.com/37f3b4ed2c8c48a6b8b57d309c5480d1",
              src: TransitNU,
            },
          ].map(({ title, desc, link, src }, i) => (
            <Link
              className="flex flex-col items-center gap-4 sm:max-w-84 sm:min-w-48 sm:text-left text-center hover:bg-oasis-extra-light hover:shadow-md hover:scale-105 transition-all duration-200 p-3 rounded-md group"
              key={i}
              href={link}
              target="_blank"
            >
              <Image
                src={src}
                alt={"Image showcasing the project"}
                className="aspect-square object-contain bg-oasis-extra-light rounded-md group-hover:shadow-md"
              />
              <div className="group-hover:bg-oasis-light rounded-md p-2">
                <h3 className="text-xl">{title}</h3>
                <p className="text-lg">{desc}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    );
}