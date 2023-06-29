"use client";

import React from "react";
import Logo from "../common/Logo";
import { BREAKPOINT } from "../helpers/types";
import useBreakpoint from "../helpers/userBreakpoint";
import NavBarMobile from "./NavBarMobile.jsx";
import "./NavBar.css";
import Link from "next/link";

export default function NavBar(isStatic = false) {
  const breakpoint = useBreakpoint();
  
  if (breakpoint === BREAKPOINT.MOBILE)
    return React.createElement(NavBarMobile, { isStatic: isStatic });
  const navStyling = isStatic
    ? `${"navContainer"} ${"staticNav"}`
    : "navContainer";

  return (
    <>
      <nav className="navContainer">
        <ul className="logoContainer">
          <Link href="/">
            <Logo className="w-10 h-10" />
          </Link>
        </ul>
        <ul className="navLinks">
          <li>
            <Link href="/">Home</Link>
          </li>
          <li>
            <Link href="/about">About</Link>
          </li>
          <li>
            <Link href="/join">Join</Link>
          </li>
          <li>
            <Link href="/mentor">Mentor</Link>
          </li>
          <li>
            <Link href="https://hub.oasisneu.com/resources">Resources</Link>
          </li>
          <li>
            <Link href="/contact">Contact</Link>
          </li>
        </ul>
      </nav>
    </>
  );
}
