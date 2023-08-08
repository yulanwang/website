import { ReactNode } from "react";
import PrimaryButton from "./PrimaryButton";

interface Props {
  title: string;
  body: ReactNode;
  buttons: Button[];
}

interface Button {
  buttonTitle: string;
  href: string;
  secondButtonTitle?: string; 
  secondHref?: string; 
}

export default function BannerCard({ title, body, buttons }: Props) {
  return (
    <div className="w-full flex flex-col gap-4 ring-4 my-8 mt-12 bg-oa-yellow-pastel ring-oa-blue rounded-md shadow-md p-4">
      <h3 className="text-3xl text-oa-blue">{title}</h3>
      <p>{body}</p>
      <div className="flex flex-row gap-4">
        {buttons.map(({ buttonTitle, href }, i) => (
          <PrimaryButton key={i} href={href}>
            {buttonTitle}
          </PrimaryButton>
        ))}
      </div>
    </div>
  );
}