import React from 'react'

const Input = ({custom,placeholder,value,onChange}) => {


  return (
   <input
    className={`${custom}`}

    placeholder={placeholder}
    type="text"
    value={value}
    onChange={onChange}
    ></input>
  )
}

export default Input