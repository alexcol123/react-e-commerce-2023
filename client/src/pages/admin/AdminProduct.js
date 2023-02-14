import { useState, useEffect } from 'react'

import axios from 'axios'
import Jumbotron from '../../components/cards/Jumbotron'
import { NavLink } from 'react-router-dom'
import { useAuth } from '../../context/auth'
import AdminMenu from '../../components/nav/AdminMenu'

const AdminProduct = () => {
  // Context
  const [auth, setAuth] = useAuth()
  // State
  const [categories, setCategories] = useState([])

  const [photo, setPhoto] = useState('')
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [price, setPrice] = useState('')
  const [category, setCategory] = useState('Choose a Category')
  console.log(category)
  const [shipping, setShipping] = useState('')
  const [quantity, setQuantity] = useState('')

  useEffect(() => {
    loadCategories()
  }, [])

  const loadCategories = async () => {
    try {
      const { data } = await axios.get('/categories')
      setCategories(data)
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
              <h4 className='text-center '>Create Product </h4>
            </div>

            {/* select */}
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className='form-select'
            >
              <option>{category}</option>

              {categories.map((c) => (
                <option value={c.name} key={c._id}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </>
  )
}

export default AdminProduct
