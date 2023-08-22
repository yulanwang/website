import { ReactNode } from "react";
import Image, { StaticImageData } from "next/image";

type Props = {
  title: string;
  body: ReactNode;
  image: StaticImageData;
  placement: "left" | "right";
};

export default function ImageParagraph({
  title,
  body,
  image,
  placement,
}: Props) {
  return (
    <div className="my-8">
      <div className="flex-row gap-6 hidden md:flex items-start">
        <Image
          className={
            "mt-5 object-scale-down drop-shadow-md aspect-3/4  h-[240px] w-auto" +
            (placement === "left" ? "" : " hidden ")
          }
          src={image}
          alt={"image to complement adjacent paragraph"}
        />
        <div>
          <h1 className="">{title}</h1>
          <p className="text-xl">{body}</p>
        </div>
        <Image
          className={
            "mt-5 object-scale-down drop-shadow-md aspect-3/4 h-[240px] w-auto" +
            (placement === "right" ? "" : " hidden ")
          }
          src={image}
          alt={"image to complement adjacent paragraph"}
        />
      </div>
      <div className="flex flex-col md:hidden gap-6 items-center">
        <div>
          <h1 className="">{title}</h1>
          <p className="text-xl">{body}</p>
        </div>
        <Image
          className="aspect-3/4 drop-shadow-md object-scale-down h-[240px] w-auto"
          src={image}
          alt={"image to complement adjacent paragraph"}
        />
      </div>
    </div>
  );
}
