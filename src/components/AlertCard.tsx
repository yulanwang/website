import { ReactNode } from "react";
import PrimaryButton from "./PrimaryButton";
import Image from "next/image";

interface Props {
  title: string;
  body: ReactNode;
  buttonTitle: string;
  href: string;
  extraButtonTitle?: string; 
  extraButtonHref?: string; 
}

export default function AlertCard({
  title,
  body,
  buttonTitle,
  href,
  extraButtonTitle,
  extraButtonHref,
}: Props) {
  const cardStyle = {
    maxWidth: "450px", // Set the maximum width here
    width: "100%", // Set to 100% to make it responsive
  };

  return (
    <div
      className="flex flex-col gap-4 ring-4 my-8 mt-12 bg-oasis-yellow-pastel ring-oasis-blue rounded-md shadow-md p-4"
      style={cardStyle}
    >
      <div className="flex items-center">
        <div>
          <Image src="/alert.svg" alt="Alert" width={30} height={30} />
        </div>
        <h3 className="text-3xl text-oasis-blue ml-2">{title}</h3>
      </div>
      <p>{body}</p>
      <div className="flex gap-4">
        <PrimaryButton href={href}>{buttonTitle}</PrimaryButton>
        {extraButtonTitle && extraButtonHref && (
          <PrimaryButton href={extraButtonHref}>{extraButtonTitle}</PrimaryButton>
        )}
      </div>
    </div>
  );
}
