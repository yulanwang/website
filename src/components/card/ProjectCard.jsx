import React from "react"
import { useEffect, useState } from "react"
import { BREAKPOINT } from "../helpers/types"
import useBreakpoint from "../helpers/userBreakpoint"
import Marino from '../../../public/images/Projects/HowBusyIsMarino.png'
import RoomieHub from '../../../public/images/Projects/RoomieHub.png'
import TransitNU from '../../../public/images/Projects/TransitNU.png'
import './ProjectCard.css';
import Image from "next/image"

const projectData = [
    {
        image: Marino,
        name: "How Busy is Marino",
        description: "HowBusyIsMarino.com is a website summarizing Marino activity over previous periods of time that produces graphical predictions for future capacity at Marino. We also have information about SquashBusters!",
        link: "https://www.linkedin.com/feed/"
    },
    {
        image: RoomieHub,
        name: "Roomie Hub",
        description: "The essential tool to track chores, groceries, schedules, and more with your roommate!",
        link: "https://www.linkedin.com/feed/"
    },
    {
        image: TransitNU,
        name: "TransitNU",
        description: "Public transportation is an important aspect of Northeastern students' lives. Many use it to get to points-of-interest around Boston or commute off campus. ",
        link: "https://www.linkedin.com/feed/"
    },
]

    const PAGE_SIZE_DESKTOP = 3
    const PAGE_SIZE_MIDSIZE = 2
    const PAGE_SIZE_MOBILE = 1

export default function ProjectCard() {
    const breakpoint = useBreakpoint()
    const [currentPage, setCurrentPage] = useState(1)
    const [totalPages, setTotalPages] = useState(1)
    const [pageSize, setPageSize] = useState(PAGE_SIZE_DESKTOP)

    useEffect(() => {
        if (breakpoint === BREAKPOINT.DESKTOP) {
          setTotalPages(Math.ceil(projectData.length / PAGE_SIZE_DESKTOP))
          setPageSize(PAGE_SIZE_DESKTOP)
        } else if (breakpoint === BREAKPOINT.MIDSIZE) {
          setTotalPages(Math.ceil(projectData.length / PAGE_SIZE_MIDSIZE))
          setPageSize(PAGE_SIZE_MIDSIZE)
        } else {
          setTotalPages(Math.ceil(projectData.length / PAGE_SIZE_MOBILE))
          setPageSize(PAGE_SIZE_MOBILE)
        }
      }, [breakpoint])
      const renderCards = () => {
        const renderCardBlock = (name, description, image, key) => {
          return (
            <div className="projectCard" key="key">
              <Image src={image} />
              <h4>{name}</h4>
              <p>{description}</p>
            </div>
          )
        }
    
        const renderedBlocks = []
        for (
          let i = (currentPage - 1) * pageSize;
          i < currentPage * pageSize && i < projectData.length;
          i++
        ) {
          renderedBlocks.push(
            renderCardBlock(
                projectData[i].name,
                projectData[i].description,
                projectData[i].image,
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
        <section className="projectCardContainer">
          <div className="projectGrid">{renderCards()}</div>
          {breakpoint === BREAKPOINT.MOBILE && (
            <div className='pageController'>{renderPageController()}</div>
          )}
        </section>
      )
}