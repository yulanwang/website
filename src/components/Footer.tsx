import React from "react";
import Logo from "./Logo";
import Link from "next/link";
import strings from "@/app/strings";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInstagram } from "@fortawesome/free-brands-svg-icons";

export default function Footer() {
  return (
    <footer className="flex flex-row justify-around bg-oasis-green text-xl text-oasis-light py-12 pb-20 px-4">
      <ul className="flex flex-col items-center">
        <Link href="/">
          <Logo className="xs:h-24 xs:w-24 h-10 w-10 fill-oasis-light hover:drop-shadow-xl transition-all duration-150" />
        </Link>
      </ul>
      <ul className="grid xs:grid-cols-2 grid-cols-1 gap-4 w-full max-w-xl px-4">
        {strings.NavBar.destinations.map(({ name, link, target }, i) => (
          <li key={i} className="w-full xs:text-left text-center">
            <Link
              className="hover:drop-shadow-xl  hover:font-semibold transition-all duration-150"
              href={link}
              target={target}
            >
              {name}
            </Link>
          </li>
        ))}
      </ul>
      <ul className="flex flex-col gap-4 items-center">
        <Link href="https://www.instagram.com/oasisneu/">
          <div className="rounded-[20px] transition-all duration-150 hover:rounded-[24px] p-2 xs:w-16 w-10 xs:h-16 h-10 flex flex-col justify-center bg-oasis-light items-center hover:shadow-lg">
            <div className="flex flex-col items-center justify-center">
              <FontAwesomeIcon
                icon={faInstagram}
                className="xs:h-10 h-6 xs:w-10 w-6 text-xl text-oasis-green drop-shadow-lg"
              />
            </div>
          </div>
        </Link>
        <Link href="/">
          <div className="rounded-[20px] transition-all duration-150 hover:rounded-[24px] p-2  xs:w-16 w-10 xs:h-16 h-10 bg-oasis-light flex flex-col justify-center items-center hover:shadow-lg">
            <div className="xs:h-10 h-6 xs:w-10 w-6 flex flex-col items-center justify-center">
              <Logo className="fill-oasis-green drop-shadow-lg" />
            </div>
          </div>
        </Link>
      </ul>
    </footer>
  );
}
