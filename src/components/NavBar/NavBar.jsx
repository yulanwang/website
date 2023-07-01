"use client";

import React from "react";
import Logo from "../common/Logo";
import { BREAKPOINT } from "../helpers/types";
import useBreakpoint from "../helpers/userBreakpoint";
import NavBarMobile from "./NavBarMobile.jsx";
import "./NavBar.css";
import Link from "next/link";

export default function NavBar() {
  const breakpoint = useBreakpoint();
  if (breakpoint === BREAKPOINT.MOBILE) return <NavBarMobile />;

  return (
    <>
      <nav className="sticky top-0 z-50 bg-oasis-green text-oasis-extra-light text-xl flex flex-col items-center justify-center shadow-2xl">
        <div className="flex flex-row justify-between items-center max-w-7xl w-full h-16 px-8">
          <Link href="/">
            <Logo className="w-10 h-10 fill-oasis-extra-light hover:drop-shadow-xl drop-shadow-md" />
          </Link>
          <ul className="flex flex-row">
            <Link className="hover:shadow-md hover:text-oasis-green transition-all duration-150 hover:bg-oasis-green-pastel hover:rounded-md p-2 px-4" href="/">Home</Link>
            <Link className="shadow-sm hover:shadow-md hover:text-oasis-green transition-all duration-150 hover:bg-oasis-green-pastel hover:rounded-md p-2 px-4" href="/about">About</Link>
            <Link className="shadow-sm hover:shadow-md hover:text-oasis-green transition-all duration-150 hover:bg-oasis-green-pastel hover:rounded-md p-2 px-4" href="/join">Join</Link>
            <Link className="shadow-sm hover:shadow-md hover:text-oasis-green transition-all duration-150 hover:bg-oasis-green-pastel hover:rounded-md p-2 px-4" href="/mentor">Mentor</Link>
            <Link className="shadow-sm hover:shadow-md hover:text-oasis-green transition-all duration-150 hover:bg-oasis-green-pastel hover:rounded-md p-2 px-4" href="https://hub.oasisneu.com/resources">Resources</Link>
            <Link className="shadow-sm hover:shadow-md hover:text-oasis-green transition-all duration-150 hover:bg-oasis-green-pastel hover:rounded-md p-2 px-4" href="/contact">Contact</Link>
          </ul>
        </div>
      </nav>
    </>
  );
}
