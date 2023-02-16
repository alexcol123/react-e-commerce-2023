import React from 'react'
import moment from 'moment'
import { BsFillCartPlusFill, BsEyeFill } from 'react-icons/bs'

const ProductCard = ({ p }) => {
  return (
    <div key={p._id} className='col'>
      <div className='card  h-100 bg-light  shadow '>
        <img src={p.photo.url} className='card-img-top myRelative' alt='...' />
        {/* Icons absolute */}
        <div className='myAbsoluteCard   '>
          <a href='#' className=''>
            <BsEyeFill size={30} className='text-black-primary mb-2' />
          </a>
          <a href='#' className=''>
            <BsFillCartPlusFill size={30} className='text-secondary ' />
          </a>
        </div>
        <div className='card-body'>
          <div className='d-flex justify-content-between  '>
            <h5 className='card-title text-warning-emphasis fw-bold'>
              {p.name.substring(0, 20)}
            </h5>
            <div className='card-title  bg-warning bg-opacity-50   p-1 rounded  shadow '>
              {p.price % 2 === 0 && (
                <span className='text-danger '>
                  <s>${(p.price * 1.25).toFixed(0)} </s>
                </span>
              )}

              <span className='mx-1'> ${p.price}</span>
            </div>
          </div>

          <p className='card-text text-muted my-1'>
            {p.description.substring(0, 63)}...
          </p>
          <div className='card-text d-flex text- justify-content-between  text-black-50'>
            <small>Released: {moment(p.createdAt).fromNow()}</small>
            <small>Sold: {p.sold}</small>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductCard
