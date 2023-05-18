import React from 'react';
import './ContentBlock.css';

export default function ContentBlock({
  title = "",
  body = "",
//   button = <></>,
  className = ""
}) {
  return (
    <div className='contentBlockContainerDefault'>
      <h2>{title}</h2>
      <p>{body}</p>
      {/* {button && button} */}
    </div>
  )
}