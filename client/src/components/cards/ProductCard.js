import React from 'react'
import moment from 'moment'
import { BsFillCartPlusFill, BsEyeFill } from 'react-icons/bs'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

const ProductCard = ({ p, hiddenBody = false }) => {
  const navigate = useNavigate()

  const addToCart = () => {
    console.log('ADDED')
  }

  const viewProduct = () => {
    navigate('/product/' + p.slug)
  }

  return (
    <div className='col'>
      <div onClick={viewProduct} className='card  h-100 bg-light  shadow text '>
        <img src={p.photo.url} className='card-img-top myRelative' alt='...' />
        {/* Icons absolute */}

        <div className='card-body row justify-content-around  '>
          <div className='d-flex justify-content-between   '>
            <h5 className='card-title text-warning-emphasis fw-bold'>
              {p.name.substring(0, 20)}
            </h5>
            <div
              className={
                hiddenBody
                  ? 'card-title  bg-primary    p-1 rounded  shadow '
                  : 'card-title  bg-warning bg-opacity-50   p-1 rounded  shadow'
              }
            >
              {p.price % 2 === 0 && (
                <span className='text-danger '>
                  <s>${(p.price * 1.25).toFixed(0)} </s>
                </span>
              )}

              <span className='mx-1'> ${p.price}</span>
            </div>
          </div>

          {!hiddenBody && (
            <div>
              <p className='card-text text-muted my-1'>
                {p.description.substring(0, 63)}...
              </p>

              <div className='card-text d-flex  mt-auto  text- justify-content-between  text-warning-emphasis'>
                <small>Released: {moment(p.createdAt).fromNow()}</small>

                {p.sold > 5 && (
                  <small className='bg-danger px-1 rounded text-light'>
                    Best Seller
                  </small>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default ProductCard
