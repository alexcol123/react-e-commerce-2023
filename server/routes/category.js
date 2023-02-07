import express from 'express'
import { create, update, remove, list, read } from '../controllers/cartegory.js'

// Middlewares
import { requireSignin, isAdmin } from '../middlewares/auth.js'

const router = express.Router()

// Routes
router.post('/category', requireSignin, isAdmin, create)
router.put('/category/:categoryId', requireSignin, isAdmin, update)
router.delete('/category/:categoryId', requireSignin, isAdmin, remove)
router.get('/categories', list)
router.get('/category/:slug', read)

export default router
