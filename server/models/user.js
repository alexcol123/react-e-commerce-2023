import mongoose from 'mongoose'
import bcrypt from 'bcrypt'


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
      max: 64,
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


UserSchema.pre('save', async function(){
  if (!this.isModified('password')) return;
  const salt = bcrypt.genSalt(10)
  this.password = await bcrypt.hash(this.password, salt)
})

UserSchema.comparePassword = async function(candidatePassword){
  const isMatch= await bcrypt.compare(candidatePassword, this.password)
  return isMatch
}

//Export the model
export default mongoose.model('User', UserSchema)
