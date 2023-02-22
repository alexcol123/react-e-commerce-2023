import { useState, useEffect } from 'react'
import axios from 'axios'
import Jumbotron from '../components/cards/Jumbotron'
import { useParams, useNavigate } from 'react-router-dom'
import ProductCard from '../components/cards/ProductCard'

const CategoryView = () => {
  const { slug } = useParams()

  const navigate = useNavigate()
  const [products, setProducts] = useState([])
  const [category, setCategory] = useState({})

  const loadProductsByCategory = async () => {
    try {
      const { data } = await axios.get(`/products-by-category/${slug}`)
      setProducts(data.products)
      setCategory(data.category)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    if (slug) loadProductsByCategory()
  }, [slug])

  return (
    <div>
      <Jumbotron
        title={` ${category?.name}`}
        subtitle={`${products?.length} products found `}
      />

      <div className='container-lg mt-4'>
        {/*  Products */}
        <div className='row row-cols-1 row-cols-md-2  row-cols-lg-3  g-3'>
          {products?.map((p) => (
            <ProductCard key={p?._id} p={p} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default CategoryView
