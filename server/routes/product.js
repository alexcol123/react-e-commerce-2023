import express from 'express'
import formidable from 'express-formidable'
import { create } from '../controllers/product.js'

// Middlewares
import { requireSignin, isAdmin } from '../middlewares/auth.js'

const router = express.Router()

// Routes
router.post('/product', requireSignin, isAdmin, formidable(), create)

export default router
