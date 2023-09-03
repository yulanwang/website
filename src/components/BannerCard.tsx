import { ReactNode } from "react";
import PrimaryButton from "./PrimaryButton";
import parse from "html-react-parser";

interface Button {
  buttonTitle: string;
  href: string;
}
interface Props {
  title: string;
  children?: ReactNode;
  buttons: Button[];
}

export default function BannerCard({ title, buttons, children }: Props) {
  return (
    <div className="w-full flex flex-col gap-4 ring-4 my-8 mt-12 bg-oa-yellow-pastel ring-oa-blue rounded-xl shadow-md p-4">
      <h3 className="text-3xl text-oa-blue">{title}</h3>
      <div className="sm:text-[20px] xs:text-[17px] xs:leading-[1.3]">
        {children}
      </div>
      <div className="flex gap-4">
        <div className="flex flex-row gap-4">
          {buttons.map(({ buttonTitle, href }, i) => (
            <PrimaryButton key={i} href={href} target="_self">
              {buttonTitle}
            </PrimaryButton>
          ))}
        </div>
      </div>
    </div>
  );
}
