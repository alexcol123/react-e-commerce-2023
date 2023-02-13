import Jumbotron from '../../components/cards/Jumbotron'
import { NavLink } from 'react-router-dom'
import { useAuth } from '../../context/auth'
import AdminMenu from '../../components/nav/AdminMenu'

const AdminCategory = () => {
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
      <div className='container-fluid'>
        <div className='row'>
          {/* Sidebar */}

          <AdminMenu />
          {/* Main */}
          <div className='col-md-9'>
            <div className='p-3 mb-2  border mt-1'>
              <h4 className='text-center '>Category Info</h4>
            </div>
            <h3>Crete Category Form</h3>
          </div>
        </div>
      </div>
    </>
  )
}

export default AdminCategory
