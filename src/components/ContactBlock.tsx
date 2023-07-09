import strings from "@/app/strings";
import { faInstagram } from "@fortawesome/free-brands-svg-icons";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import Link from "next/link";

export default function ContactBlock() {
  return (
    <div className="flex lg:flex-row flex-col w-full justify-center lg:justify-between lg:gap-12 gap-12 items-center">
      <div className="w-fit">
        <h1 className="w-full">{strings.ContactBlock.title}</h1>
        <div className="flex flex-col gap-4 w-full">
          <div className="max-w-lg">
            <h3>{strings.ContactBlock.headline}</h3>
            <p>
              {strings.ContactBlock.body}
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
          <div className="flex flex-col xs:flex-row gap-4 max-w-fit">
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
      <Image
        src={"/images/ComputerGraphic.svg"}
        alt={"Graphic of computer"}
        height={280}
        width={480}
        className="xs:mb-0 mb-16 max-w-sm"
      />
    </div>
  );
}
