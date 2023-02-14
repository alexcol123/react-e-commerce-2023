import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/auth'
import { TbLogout } from 'react-icons/tb'

const Menu = () => {
  const [auth, setAuth] = useAuth()
  const navigate = useNavigate()

  const logout = (e) => {
    e.preventDefault()
    setAuth({ ...auth, user: null, token: '' })
    localStorage.removeItem('auth')
    navigate('/')
  }

  return (
    <nav className='navbar navbar-expand-md bg-dark fixed-top '>
      <div className='container-fluid'>
        <NavLink className='navbar-brand  me-5 ' to='/'>
          <span className='navbar-brand mb-0 h1 text-white'> Adidas Store</span>
        </NavLink>
        <button
          className='navbar-toggler bg-light'
          type='button'
          data-bs-toggle='collapse'
          data-bs-target='#navbarSupportedContent'
          aria-controls='navbarSupportedContent'
          aria-expanded='false'
          aria-label='Toggle navigation'
        >
          <span className='navbar-toggler-icon'></span>
        </button>
        <div className='collapse navbar-collapse' id='navbarSupportedContent'>
          <ul className='navbar-nav me-auto mb-2 mb-lg-0'>
            {!auth?.user ? (
              <>
                <li className='nav-item '>
                  <NavLink
                    className='nav-link text-white '
                    aria-current='page'
                    to='/'
                  >
                    Home
                  </NavLink>
                </li>
                <li className='nav-item '>
                  <NavLink
                    className='nav-link text-white '
                    aria-current='page'
                    to='/dashboard/secret'
                  >
                    Secret
                  </NavLink>
                </li>

                <li className='nav-item'>
                  <NavLink
                    className='nav-link text-white '
                    aria-current='page'
                    to='/register'
                  >
                    Register
                  </NavLink>
                </li>
                <li className='nav-item'>
                  <NavLink
                    className='nav-link text-white '
                    aria-current='page'
                    to='/login'
                  >
                    Login
                  </NavLink>
                </li>
              </>
            ) : (
              <>
                {' '}
                <li className='nav-item '>
                  <NavLink
                    className='nav-link text-white '
                    aria-current='page'
                    to='/'
                  >
                    Home
                  </NavLink>
                </li>
                <li className='nav-item dropdown'>
                  <div
                    className='nav-link text-white dropdown-toggle'
                    role='button'
                    data-bs-toggle='dropdown'
                    aria-expanded='false'
                  >
                    {auth?.user?.name}
                  </div>
                  <ul className='dropdown-menu m-1 p-1'>
                    <li className='nav-item'>
                      <NavLink
                        className='dropdown-item bg-white dropdownItem'
                        to={`/dashboard/${
                          auth?.user?.role === 1 ? 'admin/' : 'user/'
                        }`}
                      >
                        Dashboard
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        className='dropdown-item bg-white dropdownItem'
                        to='/test1'
                      >
                        Another action
                      </NavLink>
                    </li>
                  </ul>
                </li>
              </>
            )}
          </ul>
          <form className='d-flex' role='search'>
            <input
              className='form-control me-2'
              type='search'
              placeholder='Search'
              aria-label='Search'
            />
            <button
              className='btn btn-outline-warning flex align-items-center '
              type='submit'
            >
              Search
            </button>
          </form>
          {auth.user && (
            <ul className='navbar-nav ms-5 mb-2 mb-lg-0'>
              <li className='nav-item flex justify-content-between align-items-center'>
                <a
                  onClick={logout}
                  className='nav-link text-warning fw-bold'
                  aria-current='page'
                  href='!#'
                >
                  Logout{' '}
                  <span className='ms-1 '>
                    <TbLogout size={20} />
                  </span>
                </a>
              </li>
            </ul>
          )}
        </div>
      </div>
    </nav>
  )
}

export default Menu
