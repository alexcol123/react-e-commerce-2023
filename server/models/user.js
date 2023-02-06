import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
    },
    email: {
      type: String,
      trim: true,
      required: true,
      unique: true,
    },

    password: {
      type: String,
      required: true,
      min: 6,
    },

    address: {
      type: String,
      trim: true,
    },

    role: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
)

// UserSchema.pre('save', async function () {
//   if (!this.isModified('password')) return
//   const salt = bcrypt.genSalt(10)
//   this.password = await bcrypt.hash(this.password, salt)
// })
UserSchema.pre('save', async function () {
  if (!this.isModified('password')) return
  const salt = await bcrypt.genSalt(10)
  this.password = await bcrypt.hash(this.password, salt)
})

UserSchema.methods.comparePassword = async function (candidatePassword) {

  const isMatch = await bcrypt.compare(candidatePassword, this.password)
  return isMatch
}

UserSchema.methods.createJWT = function () {
  return jwt.sign({ _id: this._id, name: this.name }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_LIFETIME,
  })
}

//Export the model
export default mongoose.model('User', UserSchema)
