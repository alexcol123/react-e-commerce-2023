import React from 'react'

const Jumbotron = ({title, subtitle ='Welcome to Adidas Store'}) => {
  return (
    <div className='container-fluid '>
      <div className='row'>
        <div className='col text-center p-5 bg-warning text-white'>
          <h1>{title}</h1>
          <p className="lead"> {subtitle}</p>
        </div>
      </div>
    </div>
  )
}

export default Jumbotron
