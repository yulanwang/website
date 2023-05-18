import React from 'react'
import CustomImage from '../components/common/CustomImage'
// import { container, section1, row, image, text1, text2, col,
//         section2, reverse, grid, title, timelineContainer, section3} from './DesktopContent.module.scss'
import Timeline from '../components/Timeline/Timeline'
import Card from '../components/card/Card'
import ContentBlock from '../components/common/ContentBlock'
import OasisImage1 from '../images/OasisCrowd1.png'
import OasisImage2 from '../images/OasisCrowd2.png'
import Footer from '../components/Footer/Footer'
import Sock from '../components/Footer/Sock'
import './DesktopContent.css'
import NavBar from '../components/Navbar/Navbar'

export default function DesktopContent() {
    const AboutSection = () => {
        return (
                <div className='section1'>
                    <div className='grid'>
                        <ContentBlock
                            title="About"
                            body={
                                <>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                                sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
                                Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, 
                                sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. 
                                Neque porro quisquam.
                                </>
                        }/>
                        <div className='image'>
                            <img
                                src={OasisImage1}
                                alt={'Oasis Hack Session'}
                            />
                        </div>
                    </div>
                    
                    <div className='grid'>
                        <div className='image'>
                            <img
                                src={OasisImage2}
                                alt={'Oasis Hack Session'}
                            />
                        </div>
                        <ContentBlock
                            title="Mission"
                            body={
                                <>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor 
                                incididunt ut labore et dolore magna aliqua. Nemo enim ipsam voluptatem quia 
                                voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores 
                                eos qui ratione voluptatem sequi nesciunt.
                                </>
                            }
                            className='reverse'
                        />
                    </div>
                </div>
        
            )
    }

    const TimelineSection = () => {
        return(
            <div className='section2'>
                <div className='title'>
                    <h2>Semester at a Glance</h2>
                </div>
                <div className='timelineContainer'>
                    <Timeline />
                </div>
            </div>
        )
    }

    const OasisNumbersSection = () => {
        return(
            <div className='section3'>
                <div className='title'>
                    <h2>Oasis by the Numbers</h2>
                </div>
                <Card />
            </div>
        )
    }

    const Bottom = () => {
        return(
            <div className="section4">
            <Sock />
            <Footer />
            </div>
        )
    }

    return (
        <>
            {AboutSection()}
            {TimelineSection()}
            {OasisNumbersSection()}
            {Bottom()}  
        </> 
    )
}
