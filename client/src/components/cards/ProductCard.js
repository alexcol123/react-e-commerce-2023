import React from 'react'
import moment from 'moment'

const ProductCard = ({ p }) => {
  console.log(p)
  return (
    <div key={p._id} className='col'>
      <div className='card  h-100 bg-light  shadow '>
        {/* <img src={p.photo.url} alt='' /> */}
        <img src={p.photo.url} className='card-img-top' alt='...' />
        <div className='card-body'>
          <div className='d-flex justify-content-between my-2 '>
            <h5 className='card-title text-warning-emphasis fw-bold'>
              {p.name.substring(0, 20)}
            </h5>
            <div className='card-title  bg-warning bg-opacity-50   p-1 rounded  shadow '>
              {p.price %2 ===0 &&      <span className='text-danger '>
                <s>${(p.price * 1.25).toFixed(0)} </s>
              </span>  }
         
              <span className='mx-1'> ${p.price}</span>
            </div>
          </div>

          <p className='card-text'>{p.description.substring(0, 63)}...</p>
          <p className='card-text d-flex justify-content-between'>
            <small>Released: {moment(p.createdAt).fromNow()}</small>
            <small>Sold: {p.sold}</small>
          </p>
        </div>
      </div>
    </div>
  )
}

export default ProductCard
