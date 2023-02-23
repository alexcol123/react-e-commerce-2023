import { useState, useEffect } from 'react'
import Jumbotron from '../../components/cards/Jumbotron'
import { NavLink } from 'react-router-dom'
import { useAuth } from '../../context/auth'
import UserMenu from '../../components/nav/UserMenu'
import axios from 'axios'
import toast from 'react-hot-toast'

const UserProfile = () => {
  // Context
  const [auth, setAuth] = useAuth()


  // State
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [address, setAddress] = useState('')

  useEffect(() => {
    if (auth?.user) {
      const { name, email, address } = auth.user

      setName(name || 'No Name on file')
      setEmail(email || 'No Address on file')
      setAddress(address || '')
    }
  }, [auth?.user])

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const { data } = await axios.put('/profile', { name, password, address })
      
      
      // Check if error 
      if(data?.error){
        return     toast.error(data.error)
      }
      // Update user auth
      setAuth(data)
      console.log(data)
      // update in ls
      localStorage.setItem('auth', JSON.stringify(data))
      // Show toast 
      toast.success("Profile updated successfully")
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      <Jumbotron title={` ${auth?.user?.name}`} subtitle='Dashboard' />
      <div className='container-fluid'>
        <div className='row'>
          {/* Sidebar */}

          <UserMenu />
          {/* Main */}
          <div className='col-md-9'>
            <div className='p-3 mb-2  border mt-1'>
              <h4 className='text-center '>User Profile Info</h4>
            </div>

            <form className='p-4  shadow bg-light' onSubmit={handleSubmit}>
              <div className='form-group '>
                {/* Name */}
                <label className='mt-3 mb-1' htmlFor='name'>
                  Name
                </label>
                <input
                  type='text'
                  id='name'
                  className='form-control'
                  placeholder='Enter  your name'
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  autoFocus={true}
                />
              </div>

              <div className='form-group '>
                {/* Email */}
                <label className='mt-3 mb-1' htmlFor='email'>
                  Email
                </label>
                <input
                  type='text'
                  id='email'
                  className='form-control'
                  placeholder='Enter  your email'
                  disabled={true}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div className='form-group '>
                {/* Password */}
                <label className='mt-3 mb-1' htmlFor='password'>
                  Password
                </label>
                <input
                  type='password'
                  id='password'
                  className='form-control'
                  placeholder='Enter  your password'
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <div className='form-group '>
                {/* Address */}
                <label className='mt-3 mb-1' htmlFor='address'>
                  Address
                </label>

                <textarea
                  className='form-control'
                  id='address'
                  rows='3'
                  placeholder={
                    address.length ? 'Enter your address' : 'No address on file'
                  }
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                ></textarea>
              </div>

              <button type='submit' className=' mt-3 btn btn-dark shadow'>
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}

export default UserProfile
