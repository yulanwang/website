import React from "react"
import {useState} from "react"
import Faq from '../components/faq/faq'

import TitleBlock from '../components/common/Title.jsx'
import ContentBlock from '../components/common/ContentBlock.jsx'
import Table from '../components/Table/Table.jsx'
import NavBar from '../components/Navbar/Navbar.jsx'
import Sock from '../components/Footer/Sock.jsx'
import Footer from '../components/Footer/Footer.jsx'
import './join.css'
import ProjectCard from '../components/card/ProjectCard.jsx'


export default function Join() {
    const JoinTopSection  = () => {
        return (
            <div className='joinSectionOne'>
                <TitleBlock
                    title="Join"
                    body="With support from our mentors, your group, and the Oasis community, 
                    bring your software idea to life."
                />
                <div className='joinGridOne'>
                    <div className='joinGridRow'>
                        <div className='joinGridColumn'>
                            <span className='circleTurquoise' />
                                <ContentBlock
                                    body="Bridge the gap between classes and co-op. Nemo enim ipsam voluptatem quia voluptas. 
                                    Nemo enim ipsam voluptatem quia voluptas."
                                />
                        </div>
                    </div>
                    <div className='joinGridRow'>
                        <div className='joinGridColumn'>
                            <span className='circleTurquoise' />
                                <ContentBlock
                                    body="Bridge the gap between classes and co-op. Nemo enim ipsam voluptatem quia voluptas. 
                                    Nemo enim ipsam voluptatem quia voluptas."
                                />
                        </div>
                    </div>
                    <div className='joinGridRow'>
                        <div className='joinGridColumn'>
                            <span className='circleTurquoise' />
                                <ContentBlock
                                    body="Bridge the gap between classes and co-op. Nemo enim ipsam voluptatem quia voluptas. 
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
                    title="Timeline"
                />
                <Table />
                <p>* Dates are subject to change.</p>
            </div>
        )
    }

    const JoinProjects = () => {
        return (
            <div className='projectsContainer'>
                <ContentBlock 
                    title="Projects"
                    body="Featured Projects"
                />
                <ProjectCard />
                <a class='projectButton'
                        href='https://hub.oasisneu.com/'
                        target="_blank">
                    <h4>All Projects</h4>
                </a>
            </div>
        )
    }

    const JoinFAQ = () => {
        
        return (
            <div className='joinFAQContainer'>
                <ContentBlock
                    title="FAQ"
                />
            </div>
        )
    }

    
const RenderFaqs = () => {
    const faqData = [
        {
            question: "Lorem ipsum dolor sit amet?",
            answer: "Bla bla bla."
        },
        {
            question: "Lorem ipsum dolor sit amet?",
            answer: "Bla bla bla."
        },
        {
            question: "Lorem ipsum dolor sit amet?",
            answer: "Bla bla bla."
        },
        {
            question: "Lorem ipsum dolor sit amet?",
            answer: "Bla bla bla."
        },
    ];
    const [expandedFaq, setExpandedFaq] = useState(null);
    const expandFaq = (index) => {
    setExpandedFaq(index);
    };
    const minimizeFaq = () => {
        setExpandedFaq(null);
    };
    const handleFaqClick = (index) => {
        expandedFaq === index ? minimizeFaq() : expandFaq(index);
    };

    return (React.createElement("div", { className: 'faqsContainer' }, faqData.map((faq, index) => {
        return (React.createElement(Faq, { key: index, question: faq.question, answer: faq.answer, button: faq === null 
            || faq === void 0 ? void 0 : faq.button, isExpanded: expandedFaq === index, onClick: () => {
                handleFaqClick(index);
            }, className: faq === null || faq === void 0 ? void 0 : faq.className }));
    })));
};

    return (
        <>  
            {NavBar()}
            {JoinTopSection()}
            {JoinTimeline()}
            {JoinProjects()}
            {JoinFAQ()}
            {RenderFaqs()}
            {Sock()}
            {Footer()}
        </>
    )
}
