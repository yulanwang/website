import React from 'react'

import TitleBlock from '../components/common/Title.jsx'
import ContentBlock from '../components/common/ContentBlock.jsx'

import './mentor.css'

export default function Mentor() {
    const MentorTopSection = () => {
        return (
            <div className='section1'>
                <TitleBlock
                    title="Mentor"
                    body="Teach participants how to learn the skills 
                    they need to bring their projects to life! If you've 
                    completed a co-op and are free from 12-2pm on Sundays, 
                    then you're ready to mentor."
                />
            </div>
        )
    }
    return (
        <>
            {MentorTopSection()}
        </>
    )
}