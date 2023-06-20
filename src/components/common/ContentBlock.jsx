import React from 'react';

import './ContentBlock.css';

export default function ContentBlock({
  title = "",
  body = "",
  className = "",
}) {
  return (
    React.createElement("div", { className: `${'contentBlockContainerDefault'} ${className}`},
    title && React.createElement("h2", null, title),
    body && React.createElement("p", null, body)
    )
  );
}