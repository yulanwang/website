// import {contentBlockContainerDefault} from "./Title.module.scss"
import './Title.css';

export default function TitleBlock({
    title = "",
    body = "",
    button = <></>,
    className = ""
  }) {
    return (
      <div className={`${contentBlockContainerDefault} ${className}`}>
        {title && <h2>{title}</h2>}
        {body && <p>{body}</p>}
      </div>
    )
  }