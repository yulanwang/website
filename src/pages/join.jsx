import React from 'react'

import TitleBlock from '../components/common/Title.jsx'
import ContentBlock from '../components/common/ContentBlock.jsx'
import Table from '../components/Table/Table.jsx'

import './join.css'

export default function Join() {
    const JoinTopSection  = () => {
        return (
            <div className='section1'>
                <TitleBlock
                    title="Join"
                    body="With support from our mentors, your group, and the Oasis community, 
                    bring your software idea to life."
                />
                <div className='grid1'>
                    <div className='row'>
                        <div className='circlePosition'><span className='circleTurquoise' /></div>
                        <div>
                            <ContentBlock
                                body="Bridge the gap between classes and co-op. Nemo enim ipsam voluptatem quia voluptas. 
                                Nemo enim ipsam voluptatem quia voluptas."
                            />
                        </div>
                    </div>
                    <div className='row'>
                        <div className='circlePosition'><span className='circleTurquoise' /></div>
                        <div>
                            <ContentBlock
                                body={
                                    <>
                                    Pursue project ideas together. Nemo enim ipsam voluptatem quia voluptas. 
                                    Nemo enim ipsam voluptatem quia voluptas.
                                    </>}
                            />
                        </div>
                    </div>
                    <div className='row'>
                        <div className='circlePosition'><span className='circleTurquoise' /></div>
                        <div>
                            <ContentBlock
                                body="Designed for any experience level. Nemo enim ipsam voluptatem quia voluptas. 
                                Nemo enim ipsam voluptatem quia voluptas."
                                    
                            />
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    const JoinTimeline = () => {
        return (
            <div className='timelineContainer'>
            <ContentBlock 
                title='Timeline'
            />
            <Table />
            <p>* Dates are subject to change.</p>
            </div>
        )
    }

    return (
        <>
            {JoinTopSection()}
            {JoinTimeline()}
        </>
    )
}