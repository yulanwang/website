import Footer from "@/components/Footer";
import NavBar from "@/components/NavBar";
import Sock from "@/components/Sock";
import Head from "next/head";
import { ReactNode } from "react";

type Props = {
  title?: string;
  active: string;
  children?: ReactNode;
};

export default function PageWrapper({ title, active, children }: Props) {
  return (
    <>
      <Head>
        <meta name="robots" content="noindex,nofollow" />
        {title && <title>{title}</title>}
      </Head>
      <div className="bg-oa-light">
        <NavBar active={active} />
        <div className="max-w-6xl flex flex-col items-center mx-auto pt-8 px-6 mb-16">
          {children}
        </div>
        <Sock />
        <Footer />
      </div>
    </>
  );
}
