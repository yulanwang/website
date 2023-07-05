"use client";

import { useState } from "react";
import { supabase } from "../../../lib/initSupabase";
import twMerge from "../../../twMerge";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheckCircle,
  faSpinner,
  faXmarkCircle,
} from "@fortawesome/free-solid-svg-icons";

enum LoadingState {
  Waiting,
  Loading,
  Success,
  Fail,
}

export default function Unsubscribe() {
  const [email, setEmail] = useState<string>("");
  const [loading, setLoading] = useState<LoadingState>(LoadingState.Waiting);

  const checkExists = async (email: string) => {
    let { data: emails, error } = await supabase
      .from("emails")
      .select("*")
      .eq("email", email);

    if ((emails?.length ?? 0) > 0) {
      return true;
    } else {
      return false;
    }
  };

  const unsubscribe = async () => {
    setLoading(LoadingState.Loading);

    if (!(await checkExists(email))) {
      setLoading(LoadingState.Fail);
      return;
    }

    const { error } = await supabase.from("emails").delete().eq("email", email);
    if (error) {
      setLoading(LoadingState.Fail);
    } else {
      setLoading(LoadingState.Success);
      setEmail("");
    }
  };

  return (
    <div className="w-full min-h-screen bg-oasis-light flex flex-col justify-center items-center">
      <div className="max-w-lg bg-oasis-extra-light shadow-lg p-8 rounded-lg">
        <p className="mb-2">
          Enter your email to unsubscribe from our mailing list.
        </p>
        <div className="flex flex-row max-w-lg w-full justify-center">
          {loading === LoadingState.Success ? (
            <div className="text-oasis-green">
              You've been successfully unsubscribed.
            </div>
          ) : (
            <>
              <input
                className="bg-oasis-light p-2 mr-2 rounded-lg ring-oasis-green outline-oasis-green-pastel"
                value={email}
                onChange={(e) => {
                  if (loading !== LoadingState.Success) {
                    setLoading(LoadingState.Waiting);
                    setEmail(e.target.value);
                  }
                }}
                placeholder="oasisneu@gmail.com"
              />
              <button
                className={twMerge(
                  "p-2 bg-oasis-green text-oasis-light rounded-lg shadow-md hover:text-oasis-extra-light outline-none hover:shadow-lg"
                )}
                onClick={async () => {
                  await unsubscribe();
                }}
              >
                <div className="relative">
                  <div
                    className={twMerge(
                      "flex items-center justify-center opacity-0 px-2"
                    )}
                  >
                    Unsubscribe
                  </div>
                  <div
                    className={twMerge(
                      "absolute top-0 right-0 bottom-0 left-0 flex items-center justify-center transition-all duration-300",
                      loading === LoadingState.Waiting
                        ? ""
                        : "scale-0 opacity-0"
                    )}
                  >
                    Unsubscribe
                  </div>
                  <div
                    className={twMerge(
                      "absolute top-0 right-0 bottom-0 left-0 flex items-center justify-center transition-all duration-300",
                      loading === LoadingState.Success
                        ? ""
                        : "scale-0 opacity-0"
                    )}
                  >
                    <FontAwesomeIcon className="w-6 h-6" icon={faCheckCircle} />
                  </div>
                  <div
                    className={twMerge(
                      "absolute top-0 right-0 bottom-0 left-0 flex items-center justify-center animate-spin transition-all duration-300",
                      loading === LoadingState.Loading
                        ? ""
                        : "scale-0 opacity-0"
                    )}
                  >
                    <FontAwesomeIcon className="w-6 h-6" icon={faSpinner} />
                  </div>
                  <div
                    className={twMerge(
                      "absolute top-0 right-0 bottom-0 left-0 flex items-center justify-center transition-all duration-300",
                      loading === LoadingState.Fail ? "" : "scale-0 opacity-0"
                    )}
                  >
                    <FontAwesomeIcon className="w-6 h-6" icon={faXmarkCircle} />
                  </div>
                </div>
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
