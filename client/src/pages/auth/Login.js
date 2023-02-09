import { useState } from 'react'
import { useAuth } from '../../context/auth'
import Jumbotron from '../../components/cards/Jumbotron'
import axios from 'axios'
import toast from 'react-hot-toast'
import { Link } from 'react-router-dom'

const Login = () => {
  // Context
  const [auth, setAuth] = useAuth()
  // State
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const { data } = await axios.post(`${process.env.REACT_APP_API}/login`, {
        email,
        password,
      })

      if (data.error) {
        toast.error(data.error)
      } else {
        localStorage.setItem('auth', JSON.stringify(data))
        setAuth({ ...auth, token: data.token, user: data.user })
        toast.success('Login Sucessful')
      }
    } catch (err) {
      console.log(err)
      toast.error('Login Failed. Try again')
    }
  }

  return (
    <div>
      <Jumbotron title='Adidas Store' subtitle='Login Page' />

      <div className='container'>
        <form className='mt-5 m-3' onSubmit={handleSubmit}>
          <div className='row'>
            <div className='col-md-6 offset-md-3 bg-dark p-3   rounded shadow '>
              <h2 className='text-center text-white mb-3 p-2'>Login</h2>

              <input
                type='text'
                className='form-control mb-3'
                placeholder='Enter your email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoFocus
              />

              <input
                type={showPassword ? 'text' : 'password'}
                className='form-control mb-3'
                placeholder='Enter your password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoFocus
              />

              <div className='form-check'>
                <input
                  className='form-check-input'
                  type='checkbox'
                  id='flexCheckDefault'
                  checked={showPassword}
                  onChange={() => setShowPassword(!showPassword)}
                />
                <label
                  className='form-check-label text-white'
                  htmlFor='flexCheckDefault'
                >
                  Show Password
                </label>
              </div>

              <div className='d-grid gap-2 my-3'>
                <button className='btn btn-warning'>Login</button>
              </div>

              <div className='mt-4 text-center'>
                <p className='text-white'>
                  Not a member yet
                  <Link
                    to={'/register'}
                    className='text-warning text-decoration-none fw-bold ps-2 '
                  >
                    Register
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Login
