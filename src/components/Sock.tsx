"use client";

import { useEffect, useRef, useState } from "react";
import { supabase } from "../../lib/initSupabase";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheckCircle,
  faXmarkCircle,
} from "@fortawesome/free-solid-svg-icons";
import Typed from "typed.js";

enum ResponseStatus {
  Waiting,
  Ready,
  SuccessfullyAdded,
  AddFailed,
}

export default function Sock() {
  const [email, setEmail] = useState<string>("");
  const [placeholder, setPlaceholder] = useState<string>("");
  const [status, setStatus] = useState<ResponseStatus>(ResponseStatus.Waiting);

  const selectAll = "*";
  const dbName = "emails";
  const colName = "email";

  const ref = useRef(null);

  useEffect(() => {
    if (email === "") {
      const typed = new Typed(ref.current, {
        attr: "placeholder",
        strings: ["oasisneu@gmail.com"],
        typeSpeed: 50,
        backDelay: 5000,
        loop: true
      });

      return () => {
        typed.destroy();
      };
    }
  }, [email]);

  const validateEmail = (email: string) => {
    var validRegex =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

    if (email === "") {
      return false;
    } else if (email.match(validRegex)) {
      setStatus(ResponseStatus.Ready);
      return true;
    } else {
      setStatus(ResponseStatus.Waiting);
      return false;
    }
  };

  useEffect(() => {
    validateEmail(email);
  }, [email]);

  const checkExists = async (email: string) => {
    let { data: emails, error } = await supabase
      .from(dbName)
      .select(selectAll)
      .eq(colName, email);

    if ((emails?.length ?? 0) > 0) {
      setStatus(ResponseStatus.AddFailed);
      return true;
    } else {
      return false;
    }
  };

  const insertEmail = async (email: string) => {
    let { data, error } = await supabase
      .from(dbName)
      .insert({ email: email })
      .select(selectAll);

    if (data) {
      setStatus(ResponseStatus.SuccessfullyAdded);
      setEmail("");
      return true;
    } else {
      setStatus(ResponseStatus.AddFailed);
      return false;
    }
  };

  const addEmail = async (email: string) => {
    if (status === ResponseStatus.Ready) {
      const exists: boolean = await checkExists(email);
      if (!exists) {
        const insert = await insertEmail(email);
      }
    }
  };

  const formatRS = (rs: ResponseStatus) => {
    switch (rs) {
      case ResponseStatus.AddFailed: {
        return "Add Failed";
      }
      case ResponseStatus.Ready: {
        return "Ready";
      }
      case ResponseStatus.SuccessfullyAdded: {
        return "Successfully Added";
      }
      case ResponseStatus.Waiting: {
        return "Waiting";
      }
      default: {
        return "ERROR";
      }
    }
  };

  const statusOutline = (rs: ResponseStatus) => {
    switch (rs) {
      case ResponseStatus.AddFailed: {
        return "ring-rose-500";
      }
      case ResponseStatus.Ready: {
        return "ring-oasis-green-pastel";
      }
      case ResponseStatus.SuccessfullyAdded: {
        return "ring-oasis-green";
      }
      case ResponseStatus.Waiting: {
        return "ring-oasis-yellow";
      }
      default: {
        return "ring-rose-500";
      }
    }
  };

  return (
    <div
      className={
        "text-oasis-blue flex sm:flex-row flex-col gap-6 py-32 w-full justify-center items-center sm:items-start"
      }
    >
      <div className="flex flex-col gap-2 sm:w-2/3 w-full items-center sm:items-start">
        <h2 className="text-3xl">Join our mailing list!</h2>
        <p className="text-center sm:text-left">
          Sign up to get the latest updates on Oasis, including application
          dates for both mentors and participants.
        </p>
      </div>
      <div className="sm:w-1/3 grid grid-cols-7 md:grid-rows-2 grid-rows-3 gap-2 w-full">
        <p className="text-xl col-start-1 col-span-full row-start-1 flex flex-row items-end justify-center md:justify-start">
          Enter your email:
        </p>
        <input
          className={
            "row-start-2 col-start-1 col-span-full mx-auto md:mx-0 md:min-w-0 min-w-[14rem] md:col-span-5 p-2 rounded-lg max-w-[16rem] outline-none transition-all duration-200 "
          }
          type="email"
          ref={ref}
          placeholder="oasisneu@gmail.com"
          onChange={(e) => {
            setEmail(e.target.value);
            validateEmail(email);
          }}
          value={email}
        />
        <button
          className={
            "row-start-3 md:row-start-2 md:col-end-7 text-oasis-green disabled:text-oasis-green-pastel bg-oasis-extra-light font-bold p-2 px-4 rounded-lg col-span-7 mx-auto md:mx-0 md:col-start-auto w-fit disabled:ring-0 transition-all duration-200 active:bg-oasis-light active:shadow-lg focus:ring-0 "
          }
          disabled={status !== ResponseStatus.Ready}
          onClick={() => {
            addEmail(email);
          }}
        >
          <div className="relative">
            <div
              className={
                "transition-all duration-100 " +
                (status !== ResponseStatus.SuccessfullyAdded &&
                status !== ResponseStatus.AddFailed
                  ? ""
                  : "opacity-0 scale-0 ")
              }
            >
              Submit
            </div>
            <div
              className={
                "absolute top-0 left-0 right-0 bottom-0 flex justify-center items-center transition-all duration-300 text-oasis-green " +
                (status === ResponseStatus.SuccessfullyAdded
                  ? ""
                  : "opacity-0 scale-0 ")
              }
            >
              <FontAwesomeIcon icon={faCheckCircle} />
            </div>
            <div
              className={
                "absolute top-0 left-0 right-0 bottom-0 flex justify-center items-center transition-all duration-300 text-rose-500 " +
                (status === ResponseStatus.AddFailed
                  ? ""
                  : "opacity-0 scale-0 ")
              }
            >
              <FontAwesomeIcon icon={faXmarkCircle} />
            </div>
          </div>
        </button>
      </div>
    </div>
  );
}
