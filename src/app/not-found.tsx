import PrimaryButton from "@/components/PrimaryButton";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="w-screen h-screen flex items-center justify-center flex-col bg-oa-light">
      <h1>{"Couldn't find that page"}</h1>
      <p className="text-oa-blue">
        {
          "We don't have a destination for that link, but we can send you to the homepage."
        }
      </p>
      <div className="mt-8">
        <PrimaryButton href="/" bgColor="oa-green-pastel" textColor="oa-green">
          {"To the homepage"}
        </PrimaryButton>
      </div>
    </div>
  );
}
