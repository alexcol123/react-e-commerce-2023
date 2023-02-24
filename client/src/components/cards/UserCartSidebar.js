import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/auth'
import axios from 'axios'
import DropIn from 'braintree-web-drop-in-react'
import toast from 'react-hot-toast'

const UserCartSidebar = ({ cart, setCart }) => {
  // Hooks
  const navigate = useNavigate()
  const [auth, setAuth] = useAuth()

  // State
  const [clientToken, setClientToken] = useState('')
  const [instance, setInstance] = useState('')
  const [loading, setLoading] = useState(false)

  const cartTotal = cart.reduce((total, item) => (total += item.price), 0)

  const getClientToken = async () => {
    try {
      const { data } = await axios.get('/braintree/token')
      setClientToken(data.clientToken)
    } catch (error) {
      console.log(error)
    }
  }

  const handleBuy = async () => {
    try {
      setLoading(true)
      const { nonce } = await instance.requestPaymentMethod()

      const { data } = await axios.post('/braintree/payment', { nonce, cart })

      if (data?.ok === true) {
        setLoading(false)
        localStorage.removeItem('cart')
        setCart([])
        navigate('/dashboard/user/orders')
        toast.success(' Payment Successfull')
      } else {
        setLoading(false)
        toast.error(' Payment failed try again')
      }
    } catch (error) {
      setLoading(false)
      console.log(error)
    }
  }

  useEffect(() => {
    if (auth?.token) getClientToken()
  }, [auth?.token])

  return (
    <div className='col-md-4 bg-white p-3 text-center mb-5'>
      <h4>Cart Summary</h4>
      <div>Total / Address / Payments</div>
      <hr />
      <h5>Total: ${cartTotal.toFixed(2)}</h5>

      {auth?.user ? (
        <div>
          {auth?.user?.address ? (
            <div className='mb-3'>
              <hr />

              <h4 className=' text-warning-emphasis  '>Delivery Address: </h4>
              <pre>
                <h6>{auth?.user.address}</h6>
              </pre>
              <small className='p-2'>
                *If address is not correct please update
              </small>
              <button
                onClick={() => navigate('/dashboard/user/profile')}
                className='btn btn-sm  btn-outline-danger shadow mt-1'
              >
                Update Address
              </button>
            </div>
          ) : (
            <div className='mt-5'>
              <h5>Add Address to continue </h5>
              <button
                onClick={() => navigate('/dashboard/user/profile')}
                className='btn  btn-danger shadow btn-lg '
              >
                Address +
              </button>
            </div>
          )}
        </div>
      ) : (
        <div>
          <div className='mt-5'>
            <button
              onClick={() => navigate('/login', { state: '/cart' })}
              className='btn  btn-danger shadow btn-lg '
            >
              Login to Checkout
            </button>
          </div>
        </div>
      )}
      <div className='mt-5'>
        <hr />
        <h4>Payment</h4>
        {clientToken && cart.length && (
          <>
            <DropIn
              options={{
                authorization: clientToken,
                paypal: { flow: 'vault' },
              }}
              onInstance={(instance) => setInstance(instance)}
            />

            <button
              onClick={handleBuy}
              disabled={!auth?.user?.address || !instance || loading}
              className='btn btn-danger col-12 my-2'
            >
              {loading ? ' Processing' : 'Pay Now'}
            </button>
          </>
        )}
      </div>
    </div>
  )
}

export default UserCartSidebar
