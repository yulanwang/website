import React from "react";
import { useState } from "react";
import Expand from '../../images/Expand.jsx';
import Minimize from '../../images/Minimize.jsx';
import './faq.css'

export default function FaqComponent({
    question,
    answer,
    isExpanded,
    onClick,
    button,
    className,
  }) {
    return (
        React.createElement("div", {className: `${'faqContainer'} ${className} ${isExpanded && 'expanded'}`,
                            onClick: onClick },
        React.createElement("h3", null, question),
        React.createElement("div", { onClick: onClick, className: 'icon'}, isExpanded ? <h2>-</h2> : <h2>+</h2>),
        isExpanded && React.createElement("p", null, answer)
        )
    )
}
