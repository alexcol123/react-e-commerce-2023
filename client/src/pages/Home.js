import { useEffect, useState } from 'react'
import Jumbotron from '../components/cards/Jumbotron'
import axios from 'axios'
import moment from 'moment'
import ProductCard from '../components/cards/ProductCard'

const Home = () => {
  const [products, setProducts] = useState([])

  const [sortBySoldSelect, setSortBySoldSelect] = useState(true)

  // Sort products by products sold
  const arrBySold = [...products]
  const arrByReleaded = [...products]

  const sortedBySold = arrBySold?.sort((a, b) => (a.sold < b.sold ? 1 : -1))
  const sortedByReleased = arrByReleaded?.sort((a, b) =>
    a.createdAt < b.createdAt ? 1 : -1
  )

  useEffect(() => {
    loadProducts()
  }, [])

  const loadProducts = async () => {
    try {
      const { data } = await axios.get('/products')
      setProducts(data.products)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div>
      <Jumbotron title='Adidas' />

      <div className='container-lg'>
        <div className='  d-flex  justify-content-between align-items-center my-3  bg-dark p-3 rounded'>
          <h2 className='text-white '>
            {sortBySoldSelect ? 'Best Sellers' : 'New Arrivals'}
          </h2>

          <div className='d-flex flex-column justify-content-between align-items-center  bg-light border border-3 border-warning  rounded shadow '>
          
            <div className='form-check form-check-inline '>
              <input
                className='form-check-input'
                type='radio'
                name='inlineRadioOptions'
                id='inlineRadio1'
                checked={sortBySoldSelect}
                onChange={() => setSortBySoldSelect(!sortBySoldSelect)}
              />
              <label className='form-check-label' htmlFor='inlineRadio1'>
             <small>Best Sellers</small>
              </label>
            </div>
            <div className='form-check form-check-inline'>
              <input
                className='form-check-input'
                type='radio'
                name='inlineRadioOptions'
                id='inlineRadio2'
                checked={!sortBySoldSelect}
                onChange={() => setSortBySoldSelect(!sortBySoldSelect)}
              />
              <label className='form-check-label' htmlFor='inlineRadio2'>
              <small>New Arrivals</small>
              </label>
            </div>
          </div>
        </div>

        {/*  Products */}
        <div className='row row-cols-1 row-cols-md-2  row-cols-lg-3  g-3'>
          {/* {  sortedByReleased?.map((p) => (
            <ProductCard key={p?._id} p={p} />
          ))} */}

          {!sortBySoldSelect ? (
            <>
              {sortedByReleased?.map((p) => (
                <ProductCard key={p?._id} p={p} />
              ))}{' '}
            </>
          ) : (
            <>
              {sortedBySold?.map((p) => (
                <ProductCard key={p?._id} p={p} />
              ))}
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default Home
