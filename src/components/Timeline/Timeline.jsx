import React from 'react';
// import { container, row, col, timelineStep, timelineStepDown,
//         timelineStepUp, dot, text, circle, timelineStepContent} from './Timeline.module.scss'
import './Timeline.css';

export default function Timeline() {
    return (
        <div className='timelineComponent'>
            <ul className='container'>
                <li className='timelineStepUp'>
                    <div className='timelineStepContent'>
                        <div className='text'>
                            Git-ting Started                      
                        </div>
                    </div>
                    <div className='dot'>
                        <span className='circleUp'>
                            <h4>0</h4>
                        </span>
                    </div>
                </li>

                <li className='timelineStepDown'>
                    <div className='timelineStepContent'>
                        <div className='text'>
                            Shoot your Shot
                        </div>
                    </div>
                    <div className='dot'>
                        <span className='circleDown'>
                            <h4>1</h4>
                        </span>
                    </div>
                </li>

                <li className='timelineStepUp'>
                    <div className='timelineStepContent'>
                        <div className='text'>
                            Data for Design                      
                        </div>
                    </div>
                    <div className='dot'>
                        <span className='circleUp'>
                            <h4>2</h4>
                        </span>
                    </div>
                </li>

                <li className='timelineStepDown'>
                    <div className='timelineStepContent'>
                        <div className='text'>
                            Styling + Swift
                        </div>
                    </div>
                    <div className='dot'>
                        <span className='circleDown'>
                            <h4>3</h4>
                        </span>
                    </div>
                </li>

                <li className='timelineStepUp'>
                    <div className='timelineStepContent'>
                        <div className='text'>
                            Data-BASED                      
                        </div>
                    </div>
                    <div className='dot'>
                        <span className='circleUp'>
                            <h4>4</h4>
                        </span>
                    </div>
                </li>

                <li className='timelineStepDown'>
                    <div className='timelineStepContent'>
                        <div className='text'>
                            Mid-Semester Showcase
                        </div>
                    </div>
                    <div className='dot'>
                        <span className='circleDown'>
                            <h4>5</h4>
                        </span>
                    </div>
                </li>

                <li className='timelineStepUp'>
                    <div className='timelineStepContent'>
                        <div className='text'>
                            Reeling it in                     
                        </div>
                    </div>
                    <div className='dot'>
                        <span className='circleUp'>
                            <h4>6</h4>
                        </span>
                    </div>
                </li>

                <li className='timelineStepDown'>
                    <div className='timelineStepContent'>
                        <div className='text'>
                            Mindset to Grindset
                        </div>
                    </div>
                    <div className='dot'>
                        <span className='circleDown'>
                            <h4>7</h4>
                        </span>
                    </div>
                </li>

                <li className='timelineStepUp'>
                    <div className='timelineStepContent'>
                        <div className='text'>
                            Presentation Preparation                    
                        </div>
                    </div>
                    <div className='dot'>
                        <span className='circleUp'>
                            <h4>8</h4>
                        </span>
                    </div>
                </li>

                <li className='timelineStepDown'>
                    <div className='timelineStepContent'>
                        <div className='text'>
                            Demo Day
                        </div>
                    </div>
                    <div className='dot'>
                        <span className='circleDown'>
                            <h4>D</h4>
                        </span>
                    </div>
                </li>
            </ul> 
            </div>       
    )
}