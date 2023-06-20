import React from 'react';

import './Title.css';

export default function TitleBlock({
    title = "",
    body = "",
    className = ""
  }) {
    return (
      React.createElement("div", {className: `${'titleBlockContainerDefault'} ${className}`},
      title && React.createElement("h2", null, title),
      body && React.createElement("p", null, body)
      )
    );
  }

