import { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'

const Loading = ({ path = 'login' }) => {
  // state
  const [count, setCount] = useState(5)
  // hooks
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((currentCount) => --currentCount)
    }, 1000)
    // Redirect once count is equal to 0
    count === 0 && navigate(`/${path}`, { state: location.pathname })
    // cleanup
    return () => clearInterval(interval)
  }, [count])

  return (
    <div>
      <div className='d-flex flex-column justify-content-center align-items-center vh-100'>
        <h3 className='mb-3'>You must login to access this page</h3>
        <h5 className='mb-5'>Redirecting you in {count} seconds</h5>
        {/* Loading */}
        <div
          className='spinner-border text-warning'
          style={{ width: '4rem', height: '4rem' }}
          role='status'
        >
          <span className='visually-hidden'>Loading...</span>
        </div>
      </div>
    </div>
  )
}

export default Loading
