import React from 'react'
import notFoundImage from '../assets/page_not_found.png'
import { Link } from 'react-router-dom'

const NotFoundPage = () => {


  return (
    <div className='d-flex flex-column align-items-center justify-content-center  text-center vh-100'>
      <img src={notFoundImage} alt='404' style={{ width: '700px' }} />
      <h4>That page does not exist</h4>

      <Link type='button' class='btn btn-warning mt-5' to={'/'}>
        Go Back
      </Link>
    </div>
  )
}

export default NotFoundPage
