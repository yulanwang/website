import React from 'react'

import TitleBlock from "../components/common/Title.jsx"
import ContentBlock from '../components/common/ContentBlock.jsx'

import './about.css'


export default function About() {
    const renderTop = () => {
        return (
            <>
                <div className='aboutSectionOne'>
                    <TitleBlock
                        title="About"
                        body="Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
                        sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.  
                        Nemo enim ipsam voluptatem quia voluptas"
                    />
                </div>
                <div className='mission'>
                    <ContentBlock 
                        title="Mission"
                    />
                    <div className='gridMission'>
                        <div className='row'>
                            <div className='circlePosition'><span className='circleYellow' /></div>
                        </div>
                        <div>
                            <ContentBlock
                                body="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor 
                                incididunt ut labore et dolore magna aliqua. Nemo enim ipsam voluptatem quia voluptas 
                                sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione 
                                voluptatem sequi nesciunt."
                            />
                        </div>
                        <div className='row'>
                            <div className='circlePosition'><span className='circleYellow' /></div>
                        </div>
                        <div>
                            <ContentBlock
                                body="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor 
                                incididunt ut labore et dolore magna aliqua. Nemo enim ipsam voluptatem quia voluptas 
                                sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione 
                                voluptatem sequi nesciunt."
                            />
                        </div>
                        <div className='row'>
                            <div className='circlePosition'><span className='circleYellow' /></div>
                        </div>
                        <div>
                            <ContentBlock
                                body="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor 
                                incididunt ut labore et dolore magna aliqua. Nemo enim ipsam voluptatem quia voluptas 
                                sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione 
                                voluptatem sequi nesciunt."
                            />
                        </div>
                    </div>
                </div>
            </>
        )
    }
    
    return (
        <>
            {renderTop()} 
        </>
    )
}