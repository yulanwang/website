import React from "react"
import { useEffect, useState } from "react"
import { BREAKPOINT } from "../helpers/types"
import useBreakpoint from "../helpers/userBreakpoint"
import './Card.css';

const numberData = [
    {
        number: "75",
        description: "Total Oasis Projects"
    },
    {
        number: "278",
        description: "Total Oasis Participants"
    },
    {
       number: "73",
        description: "Participants this Semester"
    },
    {
        number: "0",
        description: "Projects this Semester"
    }
]

    const PAGE_SIZE_DESKTOP = 4
    const PAGE_SIZE_MIDSIZE = 2
    const PAGE_SIZE_MOBILE = 2  

export default function Card() {
    const breakpoint = useBreakpoint()
    const [currentPage, setCurrentPage] = useState(1)
    const [totalPages, setTotalPages] = useState(1)
    const [pageSize, setPageSize] = useState(PAGE_SIZE_DESKTOP)

    useEffect(() => {
        if (breakpoint === BREAKPOINT.DESKTOP) {
          setTotalPages(Math.ceil(numberData.length / PAGE_SIZE_DESKTOP))
          setPageSize(PAGE_SIZE_DESKTOP)
        } else if (breakpoint === BREAKPOINT.MIDSIZE) {
          setTotalPages(Math.ceil(numberData.length / PAGE_SIZE_MIDSIZE))
          setPageSize(PAGE_SIZE_MIDSIZE)
        } else {
          setTotalPages(Math.ceil(numberData.length / PAGE_SIZE_MOBILE))
          setPageSize(PAGE_SIZE_MOBILE)
        }
      }, [breakpoint])
      const renderCards = () => {
        const renderCardBlock = (number, description, key) => {
          return (
            <div className="cardBlock" key="key">
              <h4>{number}</h4>
              <p>{description}</p>
            </div>
          )
        }
    
        const renderedBlocks = []
        for (
          let i = (currentPage - 1) * pageSize;
          i < currentPage * pageSize && i < numberData.length;
          i++
        ) {
          renderedBlocks.push(
            renderCardBlock(
              numberData[i].number,
              numberData[i].description,
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
        <section className="cardContainer">
          <div className="cardGrid">{renderCards()}</div>
          {breakpoint === BREAKPOINT.MOBILE && (
            <div className='pageController'>{renderPageController()}</div>
          )}
        </section>
      )
}
