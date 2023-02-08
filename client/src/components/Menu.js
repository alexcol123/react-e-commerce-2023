import React from 'react'
import { NavLink } from 'react-router-dom'

const Menu = () => {
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
            <li className='nav-item dropdown'>
              <div
                className='nav-link text-white dropdown-toggle'
            
                role='button'
                data-bs-toggle='dropdown'
                aria-expanded='false'
              >
                Dropdown
              </div>
              <ul className='dropdown-menu '>
                <li>
                  <NavLink className='dropdown-item bg-white' to='/test'>
                    Action
                  </NavLink>
                </li>
                <li>
                  <NavLink className='dropdown-item bg-white' to='/test1'>
                    Another action
                  </NavLink>
                </li>
                <li>
                  <hr className='dropdown-divider' />
                </li>
                <li>
                  <NavLink className='dropdown-item bg-white' to='/test2'>
                    Something else here
                  </NavLink>
                </li>
              </ul>
            </li>
     
          </ul>
          <form className='d-flex' role='search'>
            <input
              className='form-control me-2'
              type='search'
              placeholder='Search'
              aria-label='Search'
            />
            <button className='btn btn-outline-warning' type='submit'>
              Search
            </button>
          </form>
        </div>
      </div>
    </nav>
  )
}

export default Menu
