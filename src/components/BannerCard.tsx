import { ReactNode } from "react";
import PrimaryButton from "./PrimaryButton";

interface Props {
  title: string;
  body: ReactNode;
  buttonTitle: string;
  href: string;
  secondButtonTitle?: string; 
  secondHref?: string; 
}

export default function BannerCard({
  title,
  body,
  buttonTitle,
  href,
  secondButtonTitle,
  secondHref,
}: Props) {
  return (
    <div className="w-full flex flex-col gap-4 ring-4 my-8 mt-12 bg-oasis-yellow-pastel ring-oasis-blue rounded-xl shadow-md p-4">
      <h3 className="text-3xl text-oasis-blue">{title}</h3>
      <p className="sm:text-[20px] xs:text-[17px] xs:leading-[1.3]">{body}</p>
      <div className="flex gap-4">
          <PrimaryButton href={href}>{buttonTitle}</PrimaryButton>
          {secondButtonTitle && secondHref && (
            <PrimaryButton href={secondHref}>{secondButtonTitle}</PrimaryButton>
          )}
      </div>
    </div>
  );
}