import mongoose from 'mongoose'
const { ObjectId } = mongoose.Schema

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
      maxLength: 160,
    },

    slug: {
      type: String,
      lowercase: true,
      required: true,
      unique: true,
    },

    description: {
      type: String,
      required: true,
      maxLength: 2000,
    },
    price: {
      type: Number,
      trim: true,
      required: true,
    },

    category: {
      type: ObjectId,
      ref: 'Category',
      required: true,
    },

    quantity: {
      type: Number,
    },

    sold: {
      type: Number,
      default: 0,
    },

    photo: {
      public_id: {
        type: String,
        required: true,
      },
      url: {
        type: String,
        required: true,
      },
      required: false,
    },

    shipping: {
      required: false,
      type: Boolean,
    },
  },
  { timestamps: true }
)

//Export the model
export default mongoose.model('Product', productSchema)
