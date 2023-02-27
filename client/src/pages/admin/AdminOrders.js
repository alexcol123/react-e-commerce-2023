import { useState, useEffect } from 'react'
import axios from 'axios'
import Jumbotron from '../../components/cards/Jumbotron'
import { NavLink } from 'react-router-dom'
import { useAuth } from '../../context/auth'
import AdminMenu from '../../components/nav/AdminMenu'
import { Link } from 'react-router-dom'
import moment from 'moment'
import ProductCardHorizontal from '../../components/cards/ProductCardHorizontal'

const AdminOrders = () => {
  // Context
  const [auth, setAuth] = useAuth()
  // State
  const [orders, setOrders] = useState([])

  const [status, setStatus] = useState([
    'Not processed',
    'Processing',
    'Shipped',
    'Delivered',
    'Cancelled',
  ])

  const [changedStatus, setChangedStatus] = useState(orders?.status)
  console.log(changedStatus)

  useEffect(() => {
    if (auth?.token) getOrders()
  }, [auth?.token])

  const getOrders = async () => {
    try {
      const { data } = await axios.get('/all-orders')
      setOrders(data)
      console.log('orders updaated')
    } catch (error) {
      console.log(error)
    }
  }

  const handleChange = async (orderId, value) => {
    setChangedStatus(value)

    try {
      await axios.put(`/order-status/${orderId}`, {
        status: value,
      })

      getOrders()
    } catch (error) {
      console.log(error)
    }
  }

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
                        {/* <td>{o?.status}</td> */}
                        {/* Status */}
                        <td>
                          <div className='mb-2'>
                            <select
                              id='productCategory'
                              value={o?.status}
                              onChange={(e) =>
                                handleChange(o._id, e.target.value)
                              }
                              className='form-select p-2 mb-2'
                            >
                              {status.map((s, i) => (
                                <option value={s} key={i}>
                                  {s}
                                </option>
                              ))}
                            </select>
                          </div>
                        </td>
                        {/* End Status */}
                        <td>{o?.buyer?.name}</td>
                        <td>{moment(o?.createdAt).fromNow()}</td>
                        <td>{o?.payment?.success ? 'Success' : 'Failed'}</td>
                        <td>{o?.products?.length}</td>
                      </tr>
                    </tbody>
                  </table>

                  <div className='bg-secondary  m-1 pt-1 rounded d-flex flex-column justify-content-between align-items-center '>
                    <h4 className='text-center text-white'>Products </h4>
                    {o?.products?.map((p) => (
                      <ProductCardHorizontal
                        key={p?._id}
                        p={p}
                        remove={false}
                      />
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

export default AdminOrders
