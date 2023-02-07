import Product from '../models/product.js'
import slugyfy from 'slugify'
import cloudinary from 'cloudinary'

export const create = async (req, res) => {
  try {
    // Since we are  using formidable we have access to fields and files
    // console.log(req.fields)
    // console.log(req.files.photo)

    const { name, description, price, category, quantity, shipping } =
      req.fields
    const { photo } = req.files

    // Validation
    if (!name || !name.trim()) return res.json('Name is required')
    if (!description || !description.trim())
      return res.json('Description is required')
    if (!price) return res.json('Price is required')
    if (!category || !category.trim()) return res.json('Category is required')
    if (!quantity) return res.json('Quantity is required')
    if (!shipping) return res.json('Shipping is required')
    if (photo && photo.size > 200000)
      return res.json('Image should be under 2mb in size ')

    let photoCloudinaryInfo = {
      public_id: 'products2023/zv4jq8iubw2b7iy8cfyg',
      url: 'http://res.cloudinary.com/dqauiwwap/image/upload/v1675806199/products2023/zv4jq8iubw2b7iy8cfyg.png',
    }
    if (photo) {
      // Upload image to cloudinary
      const result = await cloudinary.v2.uploader.upload(photo.path, {
        folder: 'products2023',
      })
      const { public_id, url } = result
      // Save cloudinary image  url and id

      photoCloudinaryInfo.public_id = public_id
      photoCloudinaryInfo.url = url
    }

    const product = await Product.create({
      ...req.fields,
      photo: photoCloudinaryInfo,
    })
    res.json(product)
  } catch (err) {
    console.log(err)
    return res.status(400).json(err)
  }
}
