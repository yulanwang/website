import React from "react";
import Logo from "./common/Logo";
import InstagramIcon from "./common/InstagramIcon";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="flex flex-row justify-around bg-oasis-green text-xl text-oasis-light py-12 pb-20">
      <ul className="flex flex-col items-center">
        <Link href="/">
          <Logo className="h-24 w-24 fill-oasis-light hover:drop-shadow-xl transition-all duration-150" />
        </Link>
      </ul>
      <ul className="flex flex-col gap-4">
        <li>
          <Link
            className="hover:drop-shadow-xl  hover:font-semibold transition-all duration-150"
            href="/"
          >
            Home
          </Link>
        </li>
        <li>
          <Link
            className="hover:drop-shadow-xl  hover:font-semibold transition-all duration-150"
            href="/about"
          >
            About
          </Link>
        </li>
        <li>
          <Link
            className="hover:drop-shadow-xl  hover:font-semibold transition-all duration-150"
            href="/join"
          >
            Join
          </Link>
        </li>
      </ul>
      <ul className="flex flex-col gap-4">
        <li>
          <Link
            className="hover:drop-shadow-xl  hover:font-semibold transition-all duration-150"
            href="/mentor"
          >
            Mentor
          </Link>
        </li>
        <li>
          <Link
            className="hover:drop-shadow-xl  hover:font-semibold transition-all duration-150"
            href="https://hub.oasisneu.com/resources"
          >
            Resources
          </Link>
        </li>
        <li>
          <Link
            className="hover:drop-shadow-xl  hover:font-semibold transition-all duration-150"
            href="/contact"
          >
            Contact
          </Link>
        </li>
      </ul>
      <ul className="flex flex-col gap-4 items-center">
        <Link href="/">
          <div className="rounded-[20px] transition-all duration-150 hover:rounded-[24px] p-2 w-16 h-16 flex flex-col justify-center bg-oasis-light items-center hover:shadow-lg">
            <div className="h-10 w-10 flex flex-col items-center justify-center">
              <InstagramIcon className="fill-oasis-green drop-shadow-lg" />
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
