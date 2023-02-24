import React from 'react'

const ProductCardHorizontal = ({p, removeFromCart}) => {
  return (
    <div key={p._id} className='card shadow mb-3 p-0' style={{ maxWidth: 540 }}>
      <div className='row g-0'>
        <div className='col-md-4'>
          <img src={p.photo.url} alt={p.name} className='img-fluid ' />
        </div>

        <div className='col-md-8 h-100  '>
          <div className='card-body h-100  d-flex flex-column justify-content-between'>
            <div className='d-flex justify-content-between '>
              <h5 className='card-title text-warning-emphasis fw-bold'>
                {p.name}
              </h5>

              <span className=' card-title  bg-warning bg-opacity-100    p-1 rounded  shadow mx-1'>
                ${p.price}
              </span>
            </div>

            <div style={{ maxWidth: '80%' }}>
              <small>{p.description.substring(0, 70)}...</small>
            </div>

            <div className='align-self-end mt-2 '>
              <button
                onClick={() => removeFromCart(p)}
                className='btn btn-outline-danger btn-sm px-2 py-0 '
              >
                Remove
              </button>
            </div>

            <div></div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductCardHorizontal
