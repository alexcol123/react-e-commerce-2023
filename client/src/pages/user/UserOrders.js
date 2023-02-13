import Jumbotron from '../../components/cards/Jumbotron'
import { NavLink } from 'react-router-dom'
import { useAuth } from '../../context/auth'
import AdminMenu from '../../components/nav/AdminMenu'
import UserMenu from '../../components/nav/UserMenu'

const UserOrders = () => {
  // Context
  const [auth, setAuth] = useAuth()

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
              <h4 className='text-center '>Orders Info</h4>
            </div>

            <h3>User Orders Form here</h3>
          </div>
        </div>
      </div>
    </>
  )
}

export default UserOrders
