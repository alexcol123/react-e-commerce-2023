import React from 'react'
import { useAuth } from '../context/auth'
import { useCart } from '../context/cart'
import Jumbotron from '../components/cards/Jumbotron'
import { useNavigate } from 'react-router-dom'
import { BsTrash } from 'react-icons/bs'

const Cart = () => {
  // Context
  const [cart, setCart] = useCart()
  const [auth, setAuth] = useAuth()

  const cartTotal = cart.reduce((total, item) => (total += item.price),0)
  console.log(cartTotal)

  // Hooks
  const navigate = useNavigate()

  const removeFromCart = (p) => {
    let updatedCart = cart.filter((c) => c._id !== p._id)
    setCart(updatedCart)

    localStorage.setItem('cart', JSON.stringify(updatedCart))
  }

  return (
    <div>
      <Jumbotron
        title={`${
          auth.token ? `Cart for ${auth?.user?.name} ` : `Login to Checkout`
        }`}
        subtitle={
          cart.length >= 1
            ? `You have "${cart.length}" items on cart. ${
                auth?.token ? '' : '"Please login to checkout"'
              }`
            : 'Your Cart is empty'
        }
      />

      <div className='container-lg'>
        <div className='row'>
          <div className='col-md-12 '>
            <div className='p-3   my-4 h4 bg-light text-center '>
              {cart?.length >= 1 ? (
                'My Cart'
              ) : (
                <div className='my-5'>
                  <h4>Your Cart Is Empty</h4>

                  <button
                    className='btn btn-danger  mt-3 shadow px-3 '
                    onClick={() => navigate('/')}
                  >
                    Go Back
                  </button>
                </div>
              )}
            </div>

            {cart?.length >= 1 && (
              <div className='container'>
                <div className='row'>
                  <div className='col-md-8 '>
                    <div className='row'>
                      {cart?.map((p) => (
                        <div
                          key={p._id}
                          className='card shadow mb-3 p-0'
                          style={{ maxWidth: 540 }}
                        >
                          <div className='row g-0'>
                            <div className='col-md-4'>
                              <img
                                src={p.photo.url}
                                alt={p.name}
                                className='img-fluid '
                              />
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
                                  <small>
                                    {p.description.substring(0, 70)}...
                                  </small>
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
                      ))}
                    </div>
                  </div>
                  <div className='col-md-4 bg-white p-3'>
                    <h4 >Cart Summary</h4>
                    <div >Total / Address / Payments</div>
                    <hr />
                    <h5>Total: ${cartTotal.toFixed(2)}</h5>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Cart
