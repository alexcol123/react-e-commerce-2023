import User from '../models/user.js'
import Order from '../models/Order.js'

import jwt from 'jsonwebtoken'

// Admin Update user order status

export const updateOrderStatus = async (req, res) => {
  const orderId = req.params.orderId

  try {
    const orderStatusUpdate = await Order.findByIdAndUpdate(orderId, req.body, {
      new: true,
    })

    res.json({ message: 'Order status updated' })
  } catch (error) {
    console.log(error)
  }
}

// Admin Get  login user orders

export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate('products')
      .populate('buyer', 'name')
    res.json(orders)
  } catch (error) {
    console.log(error)
  }
}

// Get  login user orders

export const getOrders = async (req, res) => {
  try {
    const orders = await Order.find({ buyer: req.user._id })
      .populate('products')
      .populate('buyer', 'name')
    res.json(orders)
    // console.log(orders)
  } catch (error) {
    console.log(error)
  }
}

// Login
export const login = async (req, res) => {
  // Destructure
  const { email, password } = req.body
  try {
    // Validate

    if (!email.trim()) return res.json({ error: 'Email is required' })
    if (!password || password.lenght < 6)
      return res.json({
        error: 'Password is required and should be 6 characters or more',
      })

    // Find user

    const user = await User.findOne({ email })

    if (!user) {
      return res.json({ error: 'No user found with that email.' })
    }

    // Compare Password
    const passwordMatch = await user.comparePassword(password)

    if (!passwordMatch) {
      return res.json({ error: 'Wrong Password.' })
    }

    // Create JWT
    const token = await user.createJWT()

    res.status(201).json({
      user: {
        name: user.name,
        email: user.email,
        address: user.address,
        role: user.role,
      },
      token,
    })
  } catch (err) {
    // Check if email is taken
    if (err.code == 11000)
      res.json({
        error:
          'That email already exists try to login using your email ' + email,
      })
    console.log(err.code)
  }
}

export const register = async (req, res) => {
  // Destructure
  let { name, email, password, address } = req.body

  email = email.toLowerCase()

  try {
    // Validate

    if (!name.trim()) return res.json({ error: 'Name is required' })
    if (!email.trim()) return res.json({ error: 'Email is required' })
    if (!password || password.lenght < 6)
      return res.json({
        error: 'Password is required and should be 6 characters or more',
      })

    // Check if user with that email exists
    const userExist = await User.findOne({ email })
    if (userExist) {
      res.json({
        error: 'User alredy register with that email , try to login',
      })
    }

    // Save user to DB
    const user = await User.create({ name, email, password, address })

    // Create JWT
    const token = await user.createJWT()
    res.status(200).json({
      user: {
        name: user.name,
        email: user.email,
        address: user.address,
        role: user.role,
      },
      token,
    })
  } catch (err) {
    // Check if email is taken
    if (err.code == 11000)
      res.json({
        error:
          'That email already exists try to login using your email ' + email,
      })
    console.log(err.code)
  }
}

// Secret
export const secret = async (req, res) => {
  res.json({ currentUser: req.user })
}

// Update profile
export const updateProfile = async (req, res) => {
  try {
    const reveivedToken = req.headers.authorization
    const { name, password, address } = req.body

    if (password && password.length < 6) {
      return res.json({
        error: 'Password is required and should be a min of 6 characters long',
      })
    }

    const decoded = jwt.verify(reveivedToken, process.env.JWT_SECRET)

    const user = await User.findById(decoded._id)

    user.name = name || user.name
    user.password = password || user.password
    user.address = address || user.address

    await user.save()

    // Create JWT
    const token = await user.createJWT()
    res.status(200).json({
      user,
      token,
    })
  } catch (err) {
    console.log(err)
  }
}
