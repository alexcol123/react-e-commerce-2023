import React from 'react'

const Jumbotron = ({
  title,
  subtitle = 'Welcome to Adidas Store',
  backgroundColor = 'bg-warning',
  textCol = 'text-white',
}) => {
  return (
    <div className='container-fluid '>
      <div className='row'>
        {/* <div className='col text-center p-5 bg-warning text-white'> */}
        <div className={`col text-center p-5 ${backgroundColor} ${textCol} `}>
          <h1>{title}</h1>
          <p className='lead'> {subtitle}</p>
        </div>
      </div>
    </div>
  )
}

export default Jumbotron
