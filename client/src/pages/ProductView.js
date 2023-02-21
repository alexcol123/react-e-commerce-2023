import { useState, useEffect } from 'react'
import Jumbotron from '../components/cards/Jumbotron'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import moment from 'moment'
import ProductCard from '../components/cards/ProductCard'

const ProductView = () => {
  const [product, setProduct] = useState({})

  const [relatedProducts, setrelatedProducts] = useState([])

  const { slug } = useParams()

  useEffect(() => {
    loadProduct()
  }, [slug])

  useEffect(() => {
    if (!product._id) return
    loadRelated()
  }, [product])

  const loadProduct = async () => {
    try {
      const { data } = await axios.get(`/product/${slug}`)
      setProduct(data)
    } catch (error) {
      console.log(error)
    }
  }

  const loadRelated = async () => {
    try {
      const { data } = await axios.get(
        `retated-products/${product?._id}/${product?.category?._id}`
      )
      setrelatedProducts(data)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className='my-1'>
      <div className='container-lg'>
        <div className='pt-4'>
          <div className='row shadow-lg bg-white  '>
            {/* Product Photo */}
            <div className='col-md-7 p-0'>
              <img
                src={product?.photo?.url}
                className='img-fluid'
                alt={product.name}
              />
            </div>

            {/* Product Info */}
            <div className='col-md-5 '>
              <div className='card'>
                <div className='card-body row justify-content-around'>
                  <div className='mt-2 d-flex  flex-column justify-content-between align-items-center   '>
                    <h2 className='card-title text-warning-emphasis fw-bold'>
                      {product.name}
                    </h2>
                    <div className='card-title h4 bg-warning bg-opacity-50   p-2 rounded  shadow '>
                      {product.price % 2 === 0 && (
                        <span className='text-danger  '>
                          <s>${(product.price * 1.25).toFixed(2)} </s>
                        </span>
                      )}

                      <span className='mx-1'> ${product.price}</span>
                    </div>
                  </div>

                  <p className='card-text text-muted mt-4  '>
                    {product.description}
                  </p>

                  <div className='card-text d-flex   text- justify-content-between  text-warning-emphasis'>
                    <small>Category: {product?.category?.name}</small>
                    <small>
                      Available: {product?.quantity - product?.sold}
                    </small>
                  </div>

                  <div className='card-text d-flex   text- justify-content-between  text-warning-emphasis mb-3'>
                    <small>
                      Released: {moment(product.createdAt).fromNow()}
                    </small>

                    {product.sold > 5 && (
                      <small className='bg-danger px-2 rounded text-light'>
                        Best Seller
                      </small>
                    )}
                  </div>
                </div>
                <button href='#' className='btn btn-primary btn-dark m-2 my-4'>
                  Add To Cart
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {relatedProducts.length && (
        <div className='container-fluid  mt-5 m-4 rounded p-2 bg-dark text-white'>
          <h4 className='m-2 ml-5'>Related Products</h4>
          <div className=' d-flex gap-4 pb-2' style={{ overflowY: 'scroll' }}>
            {relatedProducts?.map((r) => (
              <div className='col-md-4  col-lg-4  col-xl-2' key={r._id}>
                <ProductCard hiddenBody={true} p={r} />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default ProductView
