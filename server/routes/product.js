import express from 'express'
import formidable from 'express-formidable'
import {
  create,
  list,
  read,
  remove,
  update,
  filterProducts,
  productsCount,
  listProducts,
  productsSearch,
  relatedProducts,
  getToken,
  processPayment,
} from '../controllers/product.js'

// Middlewares
import { requireSignin, isAdmin } from '../middlewares/auth.js'

const router = express.Router()

// Routes
//All Products
router.get('/products', list)
// Product CRUD
router.post('/product', requireSignin, isAdmin, formidable(), create)
router.get('/product/:slug', read)
router.delete('/product/:productId', requireSignin, isAdmin, remove)
router.put('/product/:productId', requireSignin, isAdmin, formidable(), update)
// Filtered Products
router.post('/filter-products', filterProducts)
// Product count
router.get('/products-count', productsCount)
// pagination
router.get('/list-products/:page', listProducts)
// search by keyword
router.get('/products/search/:keyword', productsSearch)
// search related products
router.get('/retated-products/:productId/:categoryId', relatedProducts)

// Braintree
router.get('/braintree/token', getToken)
router.post('/braintree/payment', processPayment)
// router.post('/braintree/payment', requireSignin, processPayment)

export default router
