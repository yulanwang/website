import { ReactNode } from "react";
import PrimaryButton from "./PrimaryButton";

interface Props {
  title: string;
  body: ReactNode;
  buttonTitle: string;
  href: string;
}

export default function BannerCard({ title, body, buttonTitle, href }: Props) {
  return (
    <div className="w-full flex flex-col gap-4 ring-4 my-8 mt-12 bg-oasis-yellow-pastel ring-oasis-blue rounded-md shadow-md p-4">
      <h3 className="text-3xl text-oasis-blue">{title}</h3>
      <p>{body}</p>
      <PrimaryButton href={href}>{buttonTitle}</PrimaryButton>
    </div>
  );
}
