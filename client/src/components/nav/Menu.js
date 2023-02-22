// import { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/auth'
import { TbLogout, TbShoppingCart } from 'react-icons/tb'

import { RiShoppingCartFill } from 'react-icons/ri'

import axios from 'axios'
import { useSearch } from '../../context/search'

import useCategory from '../../hooks/useCategory'
import { useCart } from '../../context/cart'

const Menu = () => {
  const [cart, setCart] = useCart()

  const [auth, setAuth] = useAuth()
  const navigate = useNavigate()

  // Hooks
  const categories = useCategory()

  // const [keyword, setKeyword] = useState('')
  // const [results, setResults] = useState([])

  // Hooks
  const [values, setValues] = useSearch()

  const logout = (e) => {
    e.preventDefault()
    setAuth({ ...auth, user: null, token: '' })
    localStorage.removeItem('auth')
    navigate('/')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      if (values.keyword === '') return
      const { data } = await axios.get(`products/search/` + values.keyword)
      setValues({ ...values, results: data })
      navigate('/search')
    } catch (error) {
      console.log(error)
    }
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
            <li className='nav-item '>
              <NavLink
                className='nav-link text-white '
                aria-current='page'
                to='/'
              >
                Home
              </NavLink>
            </li>

            <li className='nav-item  '>
              <NavLink
                className='nav-link text-white '
                aria-current='page'
                to='/shop'
              >
                Shop
              </NavLink>
            </li>

            <li className='nav-item dropdown'>
              <div
                className='nav-link text-white dropdown-toggle'
                role='button'
                data-bs-toggle='dropdown'
                aria-expanded='false'
              >
                Categories
              </div>
              <ul className='dropdown-menu m-1 p-1'>
                <li className='nav-item  '>
                  <NavLink
                    className='nav-link  '
                    aria-current='page'
                    to='/categories'
                  >
                    Categories Page
                  </NavLink>
                </li>

                {categories.map((c) => (
                  <li key={c._id} className='nav-item'>
                    <NavLink
                      className='dropdown-item bg-white dropdownItem'
                      to={`/category/${c.slug}`}
                    >
                      {c.name}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </li>

            {!auth?.user ? (
              <>
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
          <form onSubmit={handleSubmit} className='d-flex' role='search'>
            <input
              className='form-control me-2'
              type='search'
              placeholder='Search'
              aria-label='Search'
              value={values.keyword}
              onChange={(e) =>
                setValues({ ...values, keyword: e.target.value })
              }
            />
            <button
              className='btn btn-outline-warning flex align-items-center  '
              type='submit'
            >
              Search
            </button>
          </form>

          {/* Cart */}
          <ul className='navbar-nav ms-5 mb-2 mb-lg-0'>
            <li className='nav-item flex justify-content-between align-items-center position-relative '>
              <NavLink
                className='nav-link text-white '
                aria-current='page'
                to='/cart'
              >
                <RiShoppingCartFill
                  className='text-warning fw-bold'
                  size={25}
                />
                {cart.length > 0 && (
                  <span className='position-absolute top-25 start-100 translate-middle badge rounded-pill bg-danger'>
                    {cart.length}
                  </span>
                )}
              </NavLink>
            </li>
          </ul>

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
