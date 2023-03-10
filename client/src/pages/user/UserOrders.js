import Jumbotron from '../../components/cards/Jumbotron'
import { useState, useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import { useAuth } from '../../context/auth'
import AdminMenu from '../../components/nav/AdminMenu'
import UserMenu from '../../components/nav/UserMenu'
import axios from 'axios'
import moment from 'moment'
import ProductCardHorizontal from '../../components/cards/ProductCardHorizontal'

const UserOrders = () => {
  // Context
  const [auth, setAuth] = useAuth()

  const [orders, setOrders] = useState([])

  useEffect(() => {
    if (auth?.token) getOrders()
  }, [auth?.token])

  const getOrders = async () => {
    try {
      const { data } = await axios.get('/orders')
      setOrders(data)
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
              <h4 className='text-center '>Orders Info</h4>
            </div>

            {/* {JSON.stringify(orders, null, 4)} */}

            <div>
              {orders?.map((o, i) => (
                <div
                  key={o._id}
                  className='border shadow bg-light rounded-4 mb-4'
                >
                  <table className='table text-center '>
                    <thead>
                      <tr>
                        <th scope='col'>#</th>
                        <th scope='col'>Status</th>
                        <th scope='col'>Buyer</th>
                        <th scope='col'>Ordered</th>
                        <th scope='col'>Payment</th>
                        <th scope='col'>Quantity</th>
                      </tr>
                    </thead>

                    <tbody>
                      <tr>
                        <td>{i + 1}</td>
                        <td>{o?.status}</td>
                        <td>{o?.buyer?.name}</td>
                        <td>{moment(o?.createdAt).fromNow()}</td>
                        <td>{o?.payment?.success ? 'Success' : 'Failed'}</td>
                        <td>{o?.products?.length}</td>
                      </tr>
                    </tbody>
                  </table>


                  <div className='bg-secondary  m-1 pt-1 rounded d-flex flex-column justify-content-between align-items-center '>
                    <h4 className="text-center text-white">Products </h4>
                    {o?.products?.map((p) => (
                      <ProductCardHorizontal key={p?._id} p={p}  remove={false}/>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default UserOrders
