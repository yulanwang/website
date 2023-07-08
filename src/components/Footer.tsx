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
          <Logo className="h-24 w-24 fill-oasis-light hover:drop-shadow-xl transition-all duration-150" />
        </Link>
      </ul>
      <ul className="grid grid-cols-2 gap-4 w-full max-w-xl px-4">
        {strings.Footer.links.map(({ title, dest }, i) => (
          <li key={i} className="w-full">
            <Link
              className="hover:drop-shadow-xl  hover:font-semibold transition-all duration-150"
              href={dest}
            >
              {title}
            </Link>
          </li>
        ))}
      </ul>
      <ul className="flex flex-col gap-4 items-center">
        <Link href="https://www.instagram.com/oasisneu/">
          <div className="rounded-[20px] transition-all duration-150 hover:rounded-[24px] p-2 w-16 h-16 flex flex-col justify-center bg-oasis-light items-center hover:shadow-lg">
            <div className="h-10 w-10 flex flex-col items-center justify-center">
              <FontAwesomeIcon
                icon={faInstagram}
                className="h-10 w-10 text-xl text-oasis-green drop-shadow-lg"
              />
            </div>
          </div>
        </Link>
        <Link href="/">
          <div className="rounded-[20px] transition-all duration-150 hover:rounded-[24px] p-2 w-16 h-16 bg-oasis-light flex flex-col justify-center items-center hover:shadow-lg">
            <div className="h-10 w-10 flex flex-col items-center justify-center">
              <Logo className="fill-oasis-green drop-shadow-lg" />
            </div>
          </div>
        </Link>
      </ul>
    </footer>
  );
}
