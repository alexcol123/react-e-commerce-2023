import jwt from 'jsonwebtoken'
import User from '../models/user.js'


export const requireSignin = (req, res, next) => {
  // console.log(req.headers.authorization)
  try {
    const decoded = jwt.verify(
      req.headers.authorization,
      process.env.JWT_SECRET
    )
    req.user = decoded
    next()
  } catch (err) {
    return res.status(401).json(err)
  }
}


export const isAdmin = async(req, res, next) => {
  
  try {
    const user = await User.findById(req.user._id)    
  
    if(user.role !==1){
      return res.status(401).send('Unauthorized')
    }else{
      next()
    }
   
    next()
  } catch (err) {
    return res.status(401).json(err)
  }
}