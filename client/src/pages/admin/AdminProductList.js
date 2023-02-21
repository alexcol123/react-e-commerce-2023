import { useState, useEffect } from 'react'
import axios from 'axios'
import Jumbotron from '../../components/cards/Jumbotron'
import { NavLink } from 'react-router-dom'
import { useAuth } from '../../context/auth'
import AdminMenu from '../../components/nav/AdminMenu'
import { Link } from 'react-router-dom'
import moment from 'moment'

const AdminProductList = () => {
  // Context
  const [auth, setAuth] = useAuth()
  // State
  const [products, setProducts] = useState([])

  const loadProducts = async () => {
    try {
      const { data } = await axios.get('/products')
      setProducts(data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    loadProducts()
  }, [])

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
              <h4 className='text-center '>Admin Product List</h4>
            </div>

            {/* Products */}
            {products?.products?.map((p) => (
              <Link
                className='text-decoration-none text-secondary'
                key={p._id}
                to={`/dashboard/admin/product/update/${p.slug}`}
              >
                <div className='card mb-4 bg-black text-light-emphasis  border-0 shadow-lg'>
                  <div className='row g-0'>
                    <div className='col-md-4'>
                      <img
                        src={p.photo.url}
                        alt={p.name}
                        className='img img-fluid rounded-start'
                      />
                    </div>

                    <div className='col-md-8 '>
                      <div className='card-body '>
                        <h4 className='card-title mt-3  text-warning-emphasis'>
                          {p.name}
                        </h4>
                        <p className='card-text mt-3'>
                          {p.description?.substring(0, 175)}...
                        </p>
                        <p className='card-text'>
                          <small className='text-warning-emphasis'>
                            Created: {moment(p.createdAt).format('MMM Do YY')}
                          </small>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}

export default AdminProductList
