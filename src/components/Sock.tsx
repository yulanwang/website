"use client";

import { useEffect, useRef, useState } from "react";
import { supabase } from "../../lib/initSupabase";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheckCircle,
  faXmarkCircle,
} from "@fortawesome/free-solid-svg-icons";
import Typed from "typed.js";
import strings from "@/app/strings";
import EmailSignup from "./EmailSignup";

export default function Sock() {
  return (
    <div className={"py-24 w-full px-6 bg-oa-green-pastel"}>
      <div className="text-oa-blue flex sm:flex-row flex-col gap-6 mx-auto justify-center items-center sm:items-start bg-oa-green-pastel max-w-6xl">
        <div className="flex flex-col gap-2 sm:w-2/3 w-full items-center sm:items-start ">
          <h2 className="text-3xl">{strings.Sock.title}</h2>
          <p className="text-center sm:text-left">{strings.Sock.body}</p>
        </div>

        <EmailSignup purpose="websiteFooter" />
      </div>
    </div>
  );
}
