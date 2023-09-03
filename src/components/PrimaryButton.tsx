import { HTMLAttributeAnchorTarget, ReactNode } from "react";

interface ButtonProps
  extends React.DetailedHTMLProps<
      React.AnchorHTMLAttributes<HTMLAnchorElement>,
      HTMLAnchorElement
    >,
    React.AriaAttributes {
  bgColor?: string;
  bgColorHover?: string;
  textColor?: string;
}

export default function PrimaryButton({
  children,
  href,
  bgColor,
  bgColorHover,
  textColor,
  ...rest
}: ButtonProps) {
  return (
    <a
      href={href}
      target={rest.target ?? "_blank"}
      className={`w-fit px-4 bg-${bgColor ?? "oa-extra-light"} hover:bg-${
        bgColorHover ?? bgColor ?? "oa-light"
      } p-2 text-lg text-${
        textColor ?? "oa-blue"
      } rounded-lg ring-2 hover:ring-4 transition-all duration-200 ring-${
        textColor ?? "oa-blue"
      } shadow-lg hover:shadow-xl`}
      {...rest}
    >
      {children}
    </a>
  );
}
