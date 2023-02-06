import express from 'express'
import dotenv from 'dotenv'
import morgan from 'morgan'
import mongoose from 'mongoose'
import authRoutes from './routes/auth.js'
import categoryRoutes from './routes/category.js'

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

// Middlewares
app.use(express.json())
app.use(morgan('dev'))

// router middleware
app.use('/api', authRoutes)
app.use('/api', categoryRoutes)

const port = process.env.PORT || 8000

app.listen(port, () => {
  console.log('Node server is running on port ' + port)
})
