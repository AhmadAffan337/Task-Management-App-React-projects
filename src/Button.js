import React from 'react'

const Button = ({text,custom,type,onClick}) => 
{



  return (
    <button className={`${custom}`} onClick={onClick} type={type}>{text}</button>
  )
}

export default Button