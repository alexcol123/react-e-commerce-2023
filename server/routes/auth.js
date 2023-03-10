import express from 'express'
import {
  register,
  login,
  secret,
  updateProfile,
  getOrders,
  getAllOrders, updateOrderStatus
} from '../controllers/auth.js'

// Middlewares
import { requireSignin, isAdmin } from '../middlewares/auth.js'

const router = express.Router()

router.post('/register', register)
router.post('/login', login)

router.get('/auth-check', requireSignin, (req, res) => res.json({ ok: true }))
router.get('/admin-check', requireSignin, isAdmin, (req, res) =>
  res.json({ ok: true })
)

router.put('/profile', requireSignin, updateProfile)

// Testing
router.get('/secret', requireSignin, isAdmin, secret)

// Orders
router.get('/orders', requireSignin, getOrders)
router.get('/all-orders', requireSignin, isAdmin, getAllOrders)

// Order Admin update order Status
router.put('/order-status/:orderId', requireSignin, isAdmin, updateOrderStatus)
export default router
