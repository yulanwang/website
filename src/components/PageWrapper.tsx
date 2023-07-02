import Footer from "@/components/Footer";
import NavBar from "@/components/NavBar";
import Sock from "@/components/Sock";
import { ReactNode } from "react";

type Props = {
  children?: ReactNode;
};

export default function PageWrapper({ children }: Props) {
  return (
    <div className="bg-oasis-light">
      <NavBar />
      <div className="max-w-6xl flex flex-col items-center mx-auto pt-8 px-6">
        {children}
        <Sock />
      </div>
      <Footer />
    </div>
  );
}
