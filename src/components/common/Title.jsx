import React from 'react';

import './Title.css';

export default function TitleBlock({
    title = "",
    body = "",
    className = ""
  }) {
    return (
      <div className='titleBlockContainerDefault'>
        {title && <h2>{title}</h2>}
        {body && <p>{body}</p>}
      </div>
    )
  }