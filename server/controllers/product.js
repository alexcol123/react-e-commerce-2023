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

    const checkIfNameAlreadyExists = await Product.findOne({ name })
    if (checkIfNameAlreadyExists) {
      res.json({ error: 'That name already exists' })
      return
    }

    // Validation
    if (!name || !name.trim()) return res.json({ message: 'Name is required' })
    if (!description || !description.trim())
      return res.json({ message: 'Description is required' })
    if (!price) return res.json({ message: 'Price is required' })
    if (!category || !category.trim())
      return res.json({ message: 'Category is required' })
    if (!quantity) return res.json({ message: 'quantity is required' })
    if (!shipping) return res.json({ message: 'shipping is required' })
    if (photo && photo.size > 200000)
      return res.json({ message: 'Image should be under 2mb in size' })

    let photoCloudinaryInfo = {
      public_id: 'products2023/x9t6mmyhpwycqqywuduo',
      url: 'http://res.cloudinary.com/dqauiwwap/image/upload/v1675863537/products2023/x9t6mmyhpwycqqywuduo.jpg',
    }
    if (photo) {
      // Upload image to cloudinary
      const result = await cloudinary.v2.uploader.upload(photo.path, {
        folder: 'products2023',
        width: 840,
        crop: 'scale',
      })
      const { public_id, url } = result
      // Save cloudinary image  url and id

      photoCloudinaryInfo.public_id = public_id
      photoCloudinaryInfo.url = url
    }

    const product = await Product.create({
      ...req.fields,
      slug: slugyfy(name),
      photo: photoCloudinaryInfo,
    })
    res.json(product)
  } catch (err) {
    console.log(err)
    return res.status(400).json(err)
  }
}

export const list = async (req, res) => {
  try {
    const products = await Product.find({})
      .populate('category')
      .limit(9)
      .sort({ createdAt: -1 })
    res.json({ count: products.length, products })
  } catch (error) {
    console.log(err)
    return res.status(400).json(err)
  }
}

export const read = async (req, res) => {
  try {
    const slug = req.params.slug

    const product = await Product.findOne({ slug }).populate('category')
    res.json(product)
  } catch (error) {
    console.log(err)
    return res.status(400).json(err)
  }
}

export const remove = async (req, res) => {
  try {
    const { productId } = req.params

    // remove photo from cloudinary before deleting
    const productToDelete = await Product.findById(productId)
    if (!productToDelete) {
      res.json({ message: 'Product does not exist' })
    }

    const imageToDelete = productToDelete.photo.public_id

    // delete in cludinary
    const resp = await cloudinary.v2.uploader.destroy(imageToDelete)

    await Product.findByIdAndDelete(productId)

    res.json({ message: 'Product deleted succesfuly', cloudinaryResp: resp })
  } catch (error) {
    console.log(err)
    return res.status(400).json(err)
  }
}

export const update = async (req, res) => {
  try {
    const { productId } = req.params

    // Since we are  using formidable we have access to fields and files

    const { name, description, price, category, quantity, shipping } =
      req.fields
    const { photo } = req.files
    console.log(req.files)

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

    const productToUpdate = await Product.findById(productId)
    if (!productToUpdate) {
      res.json({ message: 'Product does not exist' })
    }

    const productImage = {
      public_id: productToUpdate.photo.public_id,
      url: productToUpdate.photo.url,
    }

    if (photo) {
      const imageToDelete = productToUpdate.photo.public_id

      // Delete photo in cloudinay + Add New photo
      const resp = await cloudinary.v2.uploader.destroy(imageToDelete)
      // If deleted cloudinary should send us a  reponce like: { result: 'ok' }
      // console.log(resp)
      // Upload image to cloudinary
      const result = await cloudinary.v2.uploader.upload(photo.path, {
        folder: 'products2023',
        width: 840,
        crop: 'scale',
      })
      const { public_id, url } = result
      // Save cloudinary image  url and id

      productImage.public_id = public_id
      productImage.url = url
    }

    const product = await Product.findByIdAndUpdate(
      productId,
      {
        ...req.fields,
        slug: slugyfy(name),
        photo: productImage,
      },
      { new: true }
    )
    res.json(product)
  } catch (err) {
    console.log(err)
    return res.status(400).json(err)
  }
}

export const filterProducts = async (req, res) => {
  try {
    const { currentCategory, priceRanges } = req.body

    console.log(currentCategory)
    console.log(typeof priceRanges)
    let args = {}
    if (currentCategory.length > 0) args.category = currentCategory
    if (priceRanges.length > 0)
      args.price = { $gte: +priceRanges[0], $lte: +priceRanges[1] }

    console.log(args)

    const products = await Product.find(
      args
      //  price: args.price,
      //category: args.category,
    )
      .populate('category')
      .limit(100)
      .sort({ createdAt: -1 })
    res.json(products)
  } catch (error) {
    console.log(err)
    return res.status(400).json(err)
  }
}

export const productsCount = async (req, res) => {
  try {
    const total = await Product.find().countDocuments()

    res.json(total)
  } catch (error) {
    console.log(err)
    return res.status(400).json(err)
  }
}

export const listProducts = async (req, res) => {
  try {
    const perPage = 6
    const page = req.params.page || 1

    const products = await Product.find({})
      .skip((page - 1) * perPage)
      .limit(perPage)
      .sort({ createdAt: -1 })

    res.json(products)
  } catch (error) {
    console.log(err)
    return res.status(400).json(err)
  }
}

export const productsSearch = async (req, res) => {
  try {
    const { keyword } = req.params

    console.log(keyword)

    const products = await Product.find({
      $or: [
        { name: { $regex: keyword, $options: 'i' } },
        { description: { $regex: keyword, $options: 'i' } },
      ],
    })

    res.json(products)
  } catch (error) {
    console.log(err)
    return res.status(400).json(err)
  }
}

export const relatedProducts = async (req, res) => {
  try {
    const { productId, categoryId } = req.params

    const related = await Product.find({
      category: categoryId,
      _id: { $ne: productId },
    })
      .populate('category')
      .limit(10)

    res.json(related)
  } catch (error) {
    console.log(error)
    return res.status(400).json(error)
  }
}
