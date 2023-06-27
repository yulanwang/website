import React from "react"
import { useEffect, useState } from "react"
import { BREAKPOINT } from "../helpers/types"
import useBreakpoint from "../helpers/userBreakpoint"
import Frank from '../../../public/images/EBoard/Frank.png'
import Image from "next/image"
import './MemberCard.css';

const memberData = [
    {
        image: Frank,
        name: "John Doe",
        description: "Position",
        link: "https://www.linkedin.com/feed/"
    },
    {
        image: Frank,
        name: "John Doe",
        description: "Position",
        link: "https://www.linkedin.com/feed/"
    },
    {
        image: Frank,
        name: "John Doe",
        description: "Position",
        link: "https://www.linkedin.com/feed/"
    },
    {
        image: Frank,
        name: "John Doe",
        description: "Position",
        link: "https://www.linkedin.com/feed/"
    },
    {
        image: Frank,
        name: "John Doe",
        description: "Position",
        link: "https://www.linkedin.com/feed/"
    },
    {
        image: Frank,
        name: "John Doe",
        description: "Position",
        link: "https://www.linkedin.com/feed/"
    },
    {
        image: Frank,
        name: "John Doe",
        description: "Position",
        link: "https://www.linkedin.com/feed/"
    },
    {
        image: Frank,
        name: "John Doe",
        description: "Position",
        link: "https://www.linkedin.com/feed/"
    },
]

    const PAGE_SIZE_DESKTOP = 8
    const PAGE_SIZE_MIDSIZE = 8
    const PAGE_SIZE_MOBILE = 8

export default function MemberCard() {
    const breakpoint = useBreakpoint()
    const [currentPage, setCurrentPage] = useState(1)
    const [totalPages, setTotalPages] = useState(1)
    const [pageSize, setPageSize] = useState(PAGE_SIZE_DESKTOP)

    useEffect(() => {
        if (breakpoint === BREAKPOINT.DESKTOP) {
          setTotalPages(Math.ceil(memberData.length / PAGE_SIZE_DESKTOP))
          setPageSize(PAGE_SIZE_DESKTOP)
        } else if (breakpoint === BREAKPOINT.MIDSIZE) {
          setTotalPages(Math.ceil(memberData.length / PAGE_SIZE_MIDSIZE))
          setPageSize(PAGE_SIZE_MIDSIZE)
        } else {
          setTotalPages(Math.ceil(memberData.length / PAGE_SIZE_MOBILE))
          setPageSize(PAGE_SIZE_MOBILE)
        }
      }, [breakpoint])
      const renderCards = () => {
        const renderCardBlock = (name, description, image, key) => {
          return (
            <div className="memberCard" key="key">
              <Image src={image} />
              <h4>{name}</h4>
              <p>{description}</p>
            </div>
          )
        }
    
        const renderedBlocks = []
        for (
          let i = (currentPage - 1) * pageSize;
          i < currentPage * pageSize && i < memberData.length;
          i++
        ) {
          renderedBlocks.push(
            renderCardBlock(
              memberData[i].name,
              memberData[i].description,
              memberData[i].image,
            )
          )
        }
        return renderedBlocks
      }
    
      const renderPageController = () => {
        const renderedPages = []
        for (let i = 1; i <= totalPages; i++) {
          renderedPages.push(
            <div
              className={currentPage === i ? 'selected' : ""}
              onClick={() => {
                setCurrentPage(i)
              }}
            />
          )
        }
        return renderedPages
      }
    
      return (
        <section className="memberCardContainer">
          <div className="memberGrid">{renderCards()}</div>
          {breakpoint === BREAKPOINT.MOBILE && (
            <div className='pageController'>{renderPageController()}</div>
          )}
        </section>
      )
}