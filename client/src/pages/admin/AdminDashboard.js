import Jumbotron from '../../components/cards/Jumbotron'
import { NavLink } from 'react-router-dom'
import { useAuth } from '../../context/auth'
import AdminMenu from '../../components/nav/AdminMenu'

const AdminDashboard = () => {
  // Context
  const [auth, setAuth] = useAuth()

  return (
    <>
      <Jumbotron
        title={` ${auth?.user?.name}`}
        subtitle='Admin Dashboard'
        backgroundColor='bg-dark bg-gradient
'
        textCol='text-warning'
      />
      <div className='container-lg'>
        <div className='row'>
          {/* Sidebar */}

          <AdminMenu />
          {/* Main */}
          <div className='col-md-9'>
            <div className='p-3 mb-2  border mt-1'>
              <h4 className='text-center '>Admin Info</h4>
            </div>

            <ul className='list-group list-unstyled'>
              <li className='list-group-item capitalize'>
                Name: {auth?.user?.name}
              </li>
              <li className='list-group-item'>Email: {auth?.user?.email}</li>
              <li className='list-group-item'>
                {auth?.user?.role === 1 ? 'Role: Administator' : 'Role: User'}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  )
}

export default AdminDashboard
