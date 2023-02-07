import express from 'express'
import dotenv from 'dotenv'
import morgan from 'morgan'
import mongoose from 'mongoose'
import authRoutes from './routes/auth.js'
import categoryRoutes from './routes/category.js'
import productRoutes from './routes/product.js'
import cloudinary from 'cloudinary'

dotenv.config()
const app = express()

// DB
mongoose.set('strictQuery', true)
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log('DB Connected'))
  .catch((err) => console.log('DB Error ==>' + err))

// // Middleware sample
// app.use((req, res, next)=> {
//   console.log('This is a  middleware')
//   next()
// })
// // Route sample
// app.get('/users', (req, res) => {
//   console.log('users')
//   res.json({
//     data: 'Alexopolis Xersis Phersepolis ',
//   })
// })

// Cloudinary 
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
})


// Middlewares
app.use(express.json())
app.use(morgan('dev'))

// router middleware
app.use('/api', authRoutes)
app.use('/api', categoryRoutes)
app.use('/api', productRoutes)

const port = process.env.PORT || 8000

app.listen(port, () => {
  console.log('Node server is running on port ' + port)
})
