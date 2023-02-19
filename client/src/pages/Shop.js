import { useEffect, useState } from 'react'
import Jumbotron from '../components/cards/Jumbotron'
import axios from 'axios'
import moment from 'moment'
import ProductCard from '../components/cards/ProductCard'

const Shop = () => {
  const [products, setProducts] = useState([])
  const [categories, setCategories] = useState([])

  const [currentCategory, setCurrentCategory] = useState([])
  const [currentPriceRange, setCurrentPriceRange] = useState([])

  const prices = [
    { _id: 0, name: 'Any', arr: [0, 10000] },
    { _id: 1, name: '$0 to $24', arr: [0, 24] },
    { _id: 2, name: '$25 to $49', arr: [26, 49] },
    { _id: 3, name: '$50 to $74', arr: [50, 74] },
    { _id: 4, name: '$75 to $99', arr: [75, 99] },
    { _id: 5, name: 'More than $100', arr: [100, 1000] },
  ]

  useEffect(() => {
    loadProducts()
    loadCategories()
  }, [])

  const addToCurrentCategoryFunc = (selectedValue) => {
    if (currentCategory.includes(selectedValue)) {
      setCurrentCategory(currentCategory.filter((c) => c !== selectedValue))
    } else {
      setCurrentCategory([...currentCategory, selectedValue])
    }
  }

  const loadCategories = async () => {
    try {
      const { data } = await axios.get('/categories')
      setCategories(data)
    } catch (error) {
      console.log(error)
    }
  }

  const loadProducts = async () => {
    try {
      const { data } = await axios.get('/products')
      setProducts(data.products)
    } catch (error) {
      console.log(error)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    let priceRanges =
      currentPriceRange.length > 0 ? currentPriceRange[0].split(',') : []

    try {
      const { data } = await axios.post('/filter-products', {
        currentCategory,
        priceRanges,
      })
      setProducts(data)
    } catch (error) {
      console.log(error)
    }
  }

  // if (products.length === 0) {
  //   return (
  //     <div
  //       style={{ minHeight: '100vh' }}
  //       className='text-center h-100 d-flex flex-column  align-items-center justify-content-center '
  //     >
  //       <h1 className=''>No Products found </h1>
  //       <p>With that filter criteria try clearing filters</p>

  //       <div className='d-grid gap-3'>
  //         <button
  //           onClick={loadProducts}
  //           className='btn btn-outline-danger shadow'
  //           type='button'
  //         >
  //           Clear Filter
  //         </button>
  //       </div>
  //     </div>
  //   )
  // }

  return (
    <>
      <Jumbotron title='Adidad Shop ' subtitle={`Searching for: Products`} />
      <div className='container-lg my-3'>
        <div className='row '>
          {/* Sidebar */}
          <div className='col-md-2 p-0 m-0'>
            {/* Filter by category */}
            <div className='h6 p-2  mb-0 min-w-100  text-center bg-dark  rounded shadow  text-warning '>
              Filter By Categories
            </div>

            <div className='row m-1 mb-4 py-3 px-2  rounded shadow-lg  rounded border border-1 border-white'>
              <div className='form-check form-check-inline'>
                <input
                  className='form-check-input'
                  type='checkbox'
                  name='inlineRadioOptions'
                  id='inlineRadio2'
                  value={'all'}
                  onChange={() => setCurrentCategory([])}
                  checked={currentCategory.length === 0}
                />
                <label className='form-check-label' htmlFor='inlineRadio2'>
                  <small>All Products</small>
                </label>
              </div>

              {categories?.map((c) => (
                <div key={c._id} className='form-check form-check-inline'>
                  <input
                    className='form-check-input'
                    type='checkbox'
                    name='inlineRadioOptions'
                    id='inlineRadio2'
                    value={c._id}
                    checked={currentCategory.includes(c._id)}
                    onChange={(e) => addToCurrentCategoryFunc(e.target.value)}
                  />
                  <label className='form-check-label' htmlFor='inlineRadio2'>
                    <small>{c.name}</small>
                  </label>
                </div>
              ))}
            </div>
            {/* Filter by Prices */}

            <div className='h6 p-2  mb-0 min-w-100  text-center bg-dark  rounded shadow  text-warning '>
              Filter By Prices
            </div>

            <div className='row m-1 mb-4 py-3 px-2  rounded shadow-lg  rounded border border-1 border-white'>
              {prices?.map((p) => (
                <div key={p._id} className='form-check form-check-inline'>
                  <input
                    className='form-check-input'
                    type='radio'
                    name='inlineRadioOptions'
                    id='inlineRadio2'
                    value={p.arr}
                    onChange={(e) => setCurrentPriceRange([e.target.value])}
                  />
                  <label className='form-check-label' htmlFor='inlineRadio2'>
                    <small>{p.name}</small>
                  </label>
                </div>
              ))}
            </div>

            <div className='d-grid gap-3'>
              <button
                onClick={handleSubmit}
                className='btn btn-outline-dark   shadow'
                type='button'
              >
                Filter
              </button>

              <button
                onClick={loadProducts}
                className='btn btn-outline-danger shadow'
                type='button'
              >
                Clear Filter
              </button>
            </div>
          </div>

          {/* Main */}
          <div className='col-md-10'>
            {/*  Products */}
            <div className='row row-cols-1 row-cols-lg-2  row-cols-xl-3  g-2'>
              {products.length ? (
                products?.map((p) => <ProductCard key={p?._id} p={p} />)
              ) : (
                // If no products found
                <div className='text-center col  offset-md-4 mt-5'>
                  <h1 className=''>No Products found </h1>
                  <p>With that filter criteria try clearing filters</p>

                  <div className='d-grid gap-3'>
                    <button
                      onClick={loadProducts}
                      className='btn btn-outline-danger shadow'
                      type='button'
                    >
                      Clear Filter
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Shop
