import React from 'react'
import rsbVideo from '../assets/Rsb.gif'

export default function Logo({width='50px'}) {
  return (
    <div>
      <img src={rsbVideo} width={width} autoPlay loop muted ></img>
    </div>
  )
}
