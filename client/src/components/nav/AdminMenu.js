import {NavLink} from 'react-router-dom'

const AdminNav = () => {
  return (
    <div className='col-md-3'>
    <div className='p-3 mb-2  border mt-1'>
      <h4 className='text-center '>Admin Links</h4>
    </div>
    <ul className='list-group list-unstyled'>
      <li>
        <NavLink
          className='list-group-item '
          to='/dashboard/admin/product'
        >
          Create Product
        </NavLink>
      </li>

      <li>
        <NavLink
          className='list-group-item'
          to='/dashboard/admin/category'
        >
          Create Category
        </NavLink>
      </li>
    </ul>
  </div>
  )
}

export default AdminNav