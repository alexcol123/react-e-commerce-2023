import express from 'express'
import { create } from '../controllers/cartegory.js'

// Middlewares
import { requireSignin, isAdmin } from '../middlewares/auth.js'

const router = express.Router()

// Routes
router.post('/category', requireSignin, isAdmin, create)

export default router
