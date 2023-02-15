import Category from '../models/category.js'
import slugyfy from 'slugify'

export const create = async (req, res) => {
  try {
    const { name } = req.body
    if (!name.trim()) {
      return res.json({ error: 'Category Name is required' })
    }

    // Check if category with this name already exists
    const existingCategory = await Category.findOne({ name })
    if (existingCategory) {
      return res.json({ error: 'Category Already exists.' })
    }
    const category = await Category.create({ name, slug: slugyfy(name) })
    res.json(category)
  } catch (err) {
    console.log(err)
    return res.status(400).json(err)
  }
}

export const update = async (req, res) => {
  try {
    const { categoryId } = req.params
    const { name } = req.body

    const existingCategory = await Category.findById(categoryId)
    if (!existingCategory) {
      return res.json({ error: 'Category Does not Exists.' })
    }

    const category = await Category.findByIdAndUpdate(
      categoryId,
      { name, slug: slugyfy(name) },
      { new: true }
    )

    res.json(category)
  } catch (error) {
    console.log(error)
    return res.status(400).json(err.message)
  }
}

export const remove = async (req, res) => {
  try {
    const { categoryId } = req.params
    const removed = await Category.findByIdAndDelete(categoryId)
    res.json({ message: 'Category has been deleted' })
  } catch (error) {
    console.log(error)
    return res.status(400).json(err.message)
  }
}

export const list = async (req, res) => {
  try {
    const all = await Category.find().sort({ name: 1 })
    res.json(all)
  } catch (error) {
    console.log(error)
    return res.status(400).json(err.message)
  }
}

export const read = async (req, res) => {
  try {
    const category = await Category.findOne({ slug: req.params.slug })
    res.json(category)
  } catch (error) {
    console.log(error)
    return res.status(400).json(err.message)
  }
}
