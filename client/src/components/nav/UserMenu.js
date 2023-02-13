import { NavLink } from 'react-router-dom'

const UserMenu = () => {
  return (
    <div className='col-md-3'>
      <div className='p-3 mb-2  border mt-1'>
        <h4 className='text-center '>User Links</h4>
      </div>
      <ul className='list-group list-unstyled'>
        <li>
          <NavLink className='list-group-item ' to='/dashboard/user/profile'>
            Profile
          </NavLink>
        </li>

        <li>
          <NavLink className='list-group-item' to='/dashboard/user/orders'>
            Orders
          </NavLink>
        </li>
      </ul>
    </div>
  )
}

export default UserMenu
