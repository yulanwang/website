import { useState } from "react";
// import { customImageDefault } from "./CustomImage.module.scss"
import './CustomImage.css'
import {GatsbyImage} from "gatsby-plugin-image"
import React from 'react'

export default function CustomImage({
  src,
  alt,
  className,
  objectFit = "cover"
}) {
  return (
    <div className="customImageDefault">
      <GatsbyImage src={src} alt={alt} fill style={{ objectFit: objectFit }} />
    </div>
  )
}
