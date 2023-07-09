import Footer from "@/components/Footer";
import NavBar from "@/components/NavBar";
import Sock from "@/components/Sock";
import { ReactNode } from "react";

type Props = {
  active: string;
  children?: ReactNode;
};

export default function PageWrapper({ active, children }: Props) {
  return (
    <div className="bg-oasis-light">
      <NavBar active={active} />
      <div className="max-w-6xl flex flex-col items-center mx-auto pt-8 px-6">
        {children}
        <Sock />
      </div>
      <Footer />
    </div>
  );
}
