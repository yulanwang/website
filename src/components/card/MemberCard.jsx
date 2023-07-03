import React from "react";
import { useEffect, useState } from "react";
import Frank from "../../../public/images/EBoard/Frank.png";
import Image from "next/image";
import "./MemberCard.css";

const memberData = [
  {
    image: Frank,
    name: "John Doe",
    description: "Position",
    link: "https://www.linkedin.com/feed/",
  },
  {
    image: Frank,
    name: "John Doe",
    description: "Position",
    link: "https://www.linkedin.com/feed/",
  },
  {
    image: Frank,
    name: "John Doe",
    description: "Position",
    link: "https://www.linkedin.com/feed/",
  },
  {
    image: Frank,
    name: "John Doe",
    description: "Position",
    link: "https://www.linkedin.com/feed/",
  },
  {
    image: Frank,
    name: "John Doe",
    description: "Position",
    link: "https://www.linkedin.com/feed/",
  },
  {
    image: Frank,
    name: "John Doe",
    description: "Position",
    link: "https://www.linkedin.com/feed/",
  },
  {
    image: Frank,
    name: "John Doe",
    description: "Position",
    link: "https://www.linkedin.com/feed/",
  },
  {
    image: Frank,
    name: "John Doe",
    description: "Position",
    link: "https://www.linkedin.com/feed/",
  },
];

export default function MemberCard() {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [pageSize, setPageSize] = useState(8);

  useEffect(() => {
    setTotalPages(Math.ceil(memberData.length / 8));
    setPageSize(8);
  }, []);
  const renderCards = () => {
    const renderCardBlock = (name, description, image, key) => {
      return (
        <div className="memberCard" key="key">
          <Image src={image} />
          <h4>{name}</h4>
          <p>{description}</p>
        </div>
      );
    };

    const renderedBlocks = [];
    for (
      let i = (currentPage - 1) * pageSize;
      i < currentPage * pageSize && i < memberData.length;
      i++
    ) {
      renderedBlocks.push(
        renderCardBlock(
          memberData[i].name,
          memberData[i].description,
          memberData[i].image
        )
      );
    }
    return renderedBlocks;
  };

  const renderPageController = () => {
    const renderedPages = [];
    for (let i = 1; i <= totalPages; i++) {
      renderedPages.push(
        <div
          className={currentPage === i ? "selected" : ""}
          onClick={() => {
            setCurrentPage(i);
          }}
        />
      );
    }
    return renderedPages;
  };

  return (
    <section className="memberCardContainer">
      <div className="memberGrid">{renderCards()}</div>

        <div className="pageController">{renderPageController()}</div>

    </section>
  );
}
