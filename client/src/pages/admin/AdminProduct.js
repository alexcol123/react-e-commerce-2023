import { useState, useEffect } from 'react'

import axios from 'axios'
import Jumbotron from '../../components/cards/Jumbotron'
import { NavLink } from 'react-router-dom'
import { useAuth } from '../../context/auth'
import AdminMenu from '../../components/nav/AdminMenu'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'

const AdminProduct = () => {
  // Context
  const [auth, setAuth] = useAuth()
  // Hooks
  const navigate = useNavigate()
  // State
  const [categories, setCategories] = useState([])

  const [photo, setPhoto] = useState('')

  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [price, setPrice] = useState('')
  const [category, setCategory] = useState('Choose a Category')
  const [shipping, setShipping] = useState(false)
  const [quantity, setQuantity] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    // console.log(category, name, description, price, shipping, quantity)
    // console.log(photo)

    // Find category ID
    const usedCategory = categories.find((c) => c.name === category)
    const categoryId = usedCategory._id

    try {
      const productData = new FormData()

      productData.append('photo', photo)
      productData.append('name', name)
      productData.append('description', description)
      productData.append('price', price)
      productData.append('category', categoryId)
      productData.append('shipping', shipping)
      productData.append('quantity', quantity)

      // console.log([...productData])
      const { data } = await axios.post('/product', productData)
      if (data.message) {
        toast.error(data.message)
        return
      }

      if (data?.error) {
        toast.error(data.error)
      } else {
        toast.success(`${data.name} was created successfully`)
        navigate('/dashboard/admin/products')
      }
    } catch (error) {
      console.log(error)
      toast.error('Product create failed please try again!')
    }
  }

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
      <div className='container-lg'>
        <div className='row'>
          {/* Sidebar */}

          <AdminMenu />
          {/* Main */}
          <div className='col-md-9'>
            <div className='p-3 mb-2  border mt-1'>
              <h4 className='text-center '>Create Product </h4>
            </div>

            {/* Form */}

            <div className='p-3'>
              <form onSubmit={handleSubmit}>
                {photo && (
                  <div className='row'>
                    <div className='col-md-6 offset-md-3 '>
                      <img
                        src={URL.createObjectURL(photo)}
                        className='rounded  img-thumbnail'
                        alt='product'
                      />
                    </div>
                  </div>
                )}
                <div className='mb-2'>
                  <label htmlFor='formFile' name='photo' className='form-label'>
                    Select a product Image
                  </label>
                  <input
                    className='form-control'
                    accept='image/*'
                    type='file'
                    id='formFile'
                    onChange={(e) => setPhoto(e.target.files[0])}
                  />
                </div>

                <div className='mb-2'>
                  <label htmlFor='productCategory' className='form-label'>
                    Product Category
                  </label>
                  <select
                    id='productCategory'
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className='form-select p-2 mb-2'
                  >
                    {categories.map((c) => (
                      <option value={c.name} key={c._id}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className='mb-2'>
                  <label htmlFor='productName' className='form-label'>
                    Product Name
                  </label>
                  <input
                    id='productName'
                    type='text'
                    className='form-control p-2 mb-2'
                    placeholder='Write category name'
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>

                <div className='mb-2'>
                  <label htmlFor='productDescription' className='form-label'>
                    Product Description
                  </label>
                  <textarea
                    id='productDescription'
                    type='text'
                    className='form-control p-2 mb-2'
                    placeholder='Write product description'
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </div>

                <div className='mb-2'>
                  <label htmlFor='productPrice' className='form-label'>
                    Product Price
                  </label>
                  <input
                    id='productPrice'
                    type='number'
                    className='form-control p-2 mb-2'
                    placeholder='Write product price'
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                  />
                </div>

                <div className='mb-2'>
                  <label htmlFor='productQuantity' className='form-label'>
                    Product Quantity
                  </label>
                  <input
                    id='productQuantity'
                    type='number'
                    className='form-control p-2 mb-2'
                    placeholder='Write product price'
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                  />
                </div>

                {/* Shipping */}
                <div className='mb-2'>
                  <label htmlFor='' className='form-label'>
                    Shipping (If no then you must pick up at store)
                  </label>
                  <div className='form-check'>
                    <input
                      className='form-check-input'
                      type='radio'
                      name='flexRadioDefault'
                      id='flexRadioDefault1'
                      checked={shipping}
                      onChange={() => setShipping(!shipping)}
                    />
                    <label
                      value={shipping}
                      className='form-check-label'
                      htmlFor='flexRadioDefault1'
                    >
                      Yes
                    </label>
                  </div>
                  <div className='form-check'>
                    <input
                      className='form-check-input'
                      type='radio'
                      name='flexRadioDefault'
                      id='flexRadioDefault2'
                      checked={!shipping}
                      onChange={() => setShipping(!shipping)}
                    />
                    <label
                      value={shipping}
                      className='form-check-label'
                      htmlFor='flexRadioDefault2'
                    >
                      No
                    </label>
                  </div>
                </div>

                <button className='btn btn-warning mt-3  px-5 shadow'>
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default AdminProduct
