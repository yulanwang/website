import { ReactNode } from "react";

export default function PrimaryButton({
  href,
  children,
}: {
  href?: string;
  children: ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      className="w-fit px-4 bg-oasis-extra-light hover:bg-oasis-light p-2 text-lg rounded-lg ring-2 hover:ring-4 transition-all duration-200 ring-oasis-blue shadow-lg hover:shadow-xl"
    >
      {children}
    </a>
  );
}
