"use client"

import React from 'react'

import TitleBlock from '../../components/common/Title.jsx'
import ContentBlock from '../../components/common/ContentBlock.jsx'
import NavBar from '../../components/Navbar/Navbar.jsx'
import Footer from '../../components/Footer/Footer.jsx'
import Sock from '../../components/Footer/Sock.jsx'

import './mentor.css'


export default function Mentor() {
    const MentorTopSection = () => {
        return (
            <div className='mentorSectionOne'>
                <TitleBlock
                    title="Mentor"
                    body="Teach participants how to learn the skills 
                    they need to bring their projects to life! If you've 
                    completed a co-op and are free from 12-2pm on Sundays, 
                    then you're ready to mentor."
                />
                <div className='memberGridOne'>
                    <div className='memberGridRow'>
                        <div className='circlePosition'><span className='circleTurquoise' /></div>
                        <ContentBlock
                            body="Any Northeastern student who has completed at least one computer science co-op."
                        />
                    </div>
                    <div className='memberGridRow'>
                        <div className='circlePosition'><span className='circleTurquoise' /></div>
                        <ContentBlock
                            body="Mentors work with two teams to guide them through their making first web app."
                        />
                    </div>
                    <div className='memberGridRow'>
                        <div className='circlePosition'><span className='circleTurquoise' /></div>
                        <ContentBlock
                            body="A low-commitment chance to mentor students and help them make their ideas into reality!"
                        />
                    </div>
                    <div className='memberGridRow'>
                        <div className='circlePosition'><span className='circleTurquoise' /></div>
                        <ContentBlock
                            body="There are 8 weekly hack sessions. Mentors must be available most Sundays from 11:30 AM to 2PM."
                        />
                    </div>
                </div>
            </div>
        )
    }
    return (
        <>
            {NavBar()}
            {MentorTopSection()}
            {Sock()}
            {Footer()}
        </>
    )
}