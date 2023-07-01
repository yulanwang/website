import React from "react";
import Image from "next/image";
import Logo from "../common/Logo";
import LogoGreen from "../../../public/images/GreenLogo.svg";
import InstagramIcon from "../common/InstagramIcon";
import "./Footer.css";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="flex flex-row justify-around bg-oasis-green py-12 pb-20">
      <ul className="flex flex-col w-1/4 items-center">
        <Link href="/">
          <Logo className="h-24 w-24 fill-oasis-light hover:drop-shadow-xl transition-all duration-150" />
        </Link>
      </ul>
      <ul className="flex flex-row w-1/2 text-xl text-oasis-light pl-16">
        <div className="flex flex-col w-1/2 gap-4">
          <li>
            <Link className="hover:drop-shadow-xl transition-all duration-150" href="/">
              Home
            </Link>
          </li>
          <li>
            <Link className="hover:drop-shadow-xl transition-all duration-150" href="/about">
              About
            </Link>
          </li>
          <li>
            <Link className="hover:drop-shadow-xl transition-all duration-150" href="/join">
              Join
            </Link>
          </li>
        </div>
        <div className="flex flex-col w-1/2 gap-4">
          <li>
            <Link className="hover:drop-shadow-xl transition-all duration-150" href="/mentor">
              Mentor
            </Link>
          </li>
          <li>
            <Link
              className="hover:drop-shadow-xl transition-all duration-150"
              href="https://hub.oasisneu.com/resources"
            >
              Resources
            </Link>
          </li>
          <li>
            <Link className="hover:drop-shadow-xl transition-all duration-150" href="/contact">
              Contact
            </Link>
          </li>
        </div>
      </ul>
      <ul className="flex flex-col gap-4 w-1/4 items-center pr-24">
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
