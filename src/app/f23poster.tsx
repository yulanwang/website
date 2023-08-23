"use client";

import { redirect } from "next/navigation";
import { useEffect } from "react";
import { supabase } from "../../lib/initSupabase";

const pageName = "f23poster";

interface Impressions {
  count: number;
  title: string;
}

async function getCount(page: string): Promise<number | null> {
  const { data } = await supabase
    .from("loads")
    .select("title,count")
    .eq("title", page);

  console.log(data);

  if (data) {
    const count = data.reduce(
      (accumulator, currentValue) => accumulator + currentValue["count"],
      0
    );
    console.log(count);
    return count;
  } else {
    return null;
  }
}

async function updateCount(page: string) {
  const count = await getCount(page);

  console.log(count);

  if (count === null) {
    return;
  }

  const { data, error } = await supabase
    .from("loads")
    .update({ count: count + 1 })
    .eq("title", page)
    .select();

  console.log("counted");
}

export default function F23Poster() {
  useEffect(() => {
    updateCount(pageName);

    redirect("/");
  }, []);

  return (
    <div className="h-screen w-screen flex items-center justify-center flex-col bg-oa-yellow-pastel">
      <h1>{"Thanks for scanning our poster!"}</h1>
      <p className="text-oa-blue">{"We're sending you to the main site now."}</p>
    </div>
  );
}
