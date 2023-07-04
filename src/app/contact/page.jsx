import React from "react";

import PageWrapper from "@/components/PageWrapper";
import Link from "next/link";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInstagram } from "@fortawesome/free-brands-svg-icons";
import { faEnvelope } from "@fortawesome/free-regular-svg-icons";
import DecorationImage from "../../../public/images/ComputerGraphic.svg";

export default function Contact() {
  return (
    <PageWrapper>
      <div className="flex xl:flex-row flex-col w-full justify-center xl:justify-between xl:gap-12 gap-24 items-center">
        <div>
          <h1 className="w-full">Contact Us!</h1>
          <div className="flex flex-col gap-4 w-full">
            <div className="max-w-lg">
              <h3>Send us a message!</h3>
              <p>
                Have a question we haven't managed to answer? Have a proposition
                you want us to take a look at? Either send us an{" "}
                <Link href="mailto:oasisneu@gmail.com">
                  <b>email</b>
                </Link>{" "}
                or message us on{" "}
                <Link href="instagram.com/oasisneu">
                  <b>Instagram</b>
                </Link>
                !
              </p>
            </div>
            <div className="flex flex-row gap-4">
              {[
                {
                  destination: "https://www.instagram.com/oasisneu/",
                  icon: faInstagram,
                  text: "instagram.com/oasisneu",
                },
                {
                  destination: "mailto:oasisneu@gmail.com",
                  icon: faEnvelope,
                  text: "oasisneu@gmail.com",
                },
              ].map(({ destination, icon, text }, i) => (
                <Link
                  key={i}
                  href={destination}
                  className="flex flex-row items-center gap-2 bg-oasis-extra-light p-3 rounded-lg group hover:shadow-lg shadow-md transition-all duration-200 hover:ring-2 ring-oasis-green"
                >
                  <FontAwesomeIcon
                    className="text-oasis-green text-2xl rounded-lg"
                    icon={icon}
                  />
                  <h4 className="rounded-lg">{text}</h4>
                </Link>
              ))}
            </div>
          </div>
        </div>
        <Image src={DecorationImage} height={280} width={480} className="" />
      </div>
    </PageWrapper>
  );
}
