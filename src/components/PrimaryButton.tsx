import { HTMLAttributeAnchorTarget, ReactNode } from "react";

interface ButtonProps extends React.DetailedHTMLProps<React.AnchorHTMLAttributes<HTMLAnchorElement>, HTMLAnchorElement>, React.AriaAttributes {

}

export default function PrimaryButton({
  children,
  href,
  ...rest
}: ButtonProps) {
  return (
    <a
      href={href}
      target={rest.target ?? "_blank"}
      className="w-fit px-4 bg-oa-extra-light hover:bg-oa-light p-2 text-lg rounded-lg ring-2 hover:ring-4 transition-all duration-200 ring-oa-blue shadow-lg hover:shadow-xl"
      {... rest}
    >
      {children}
    </a>
  );
}
