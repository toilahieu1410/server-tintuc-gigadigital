import Joi from 'joi'
import { ObjectId } from 'mongodb'
import { getDB } from "../config/mongodb"

const categoriesNewsName = 'categoriesNews'

const categoriesNewsSchema = Joi.object({
  type: Joi.number().required(),
  name: Joi.string().trim().required(),
  slug: Joi.string().trim().required(),
  title: Joi.string().trim().default(null),
  description: Joi.string().default(null),
  title_type: Joi.boolean().default(false),
  images: Joi.string().default(null),
  link_image: Joi.string().trim().default(null),
  thumb: Joi.string().default(null),
  link_thumb: Joi.string().trim().default(null),
  icon: Joi.string().default(null),
  sort_order: Joi.number().default(0),
  subCategory: Joi.array().items(Joi.string()).default([]),           // array con
  categoryId: Joi.string().default(null),                             // id cua category cha trong subCate
  chidrenCategories: Joi.array().items(Joi.string()).default([]),     // array con cua subCate
  subCategoryId: Joi.string().default(null),                          // id cua subCate trong chidren
  createdAt: Joi.date().timestamp().default(Date.now()),
  updatedAt: Joi.date().timestamp().default(null),
  _destroy: Joi.boolean().default(false)
})

const validateSchema = async (data) => {
  return await categoriesNewsSchema.validateAsync(data, { abortEarly: false })
}

const getCategoryNews = async (data) => {
  try {
    const result = await getDB().collection(categoriesNewsName).find({ type: data }).sort({ sort_order: 1 }).toArray()
    return result
  } catch (error) {
    throw new Error(error)
  }
}

const getSubCategoryNews = async (id) => {
  try {
    const idString = id.toString()
    const result = await getDB().collection(categoriesNewsName).find(
      { categoryId: idString, type: 1 }
    ).sort({ sort_order: 1 }).toArray()
    return result
  } catch (error) {
    throw new Error(error)
  }
}

const getChildrenCategoryNews = async (id) => {
  try {
    const idString = data.toString()
    const result = await getDB().collection(categoriesNewsName).find(
      { subCategoryId: idString, type: 2 }
    ).sort({ sort_order: 1 }).toArray()
    return result
  } catch (error) {
    throw new Error(error)
  }
}

const getCategoryIdNew = async (id) => {
  try {
    const result = await getDB().collection(categoriesNewsName).findOne({ _id: ObjectId(id) })
    return result
  } catch (error) {
    throw new Error(error)
  }
}

const postCategoryNew = async (data) => {
  try {
    const validatedValue = await validateSchema(data)
    const result = await getDB().collection(categoriesNewsName).insertOne(validatedValue)
    return result
  } catch (error) {
    throw new Error(error)
  }
}

const putCategoryNew = async (id, data) => {
  try {
    const result = await getDB().collection(categoriesNewsName).findOneAndUpdate(
      { _id: ObjectId(id) },
      { $set: data },
      { returnOriginal: true }
    )
    return result
  } catch (error) {
    throw new Error(error)
  }
}

const deleteCategoryNew = async (id) => {
  try {
    const result = await getDB().collection(categoriesNewsName).deleteOne({ _id: ObjectId(id) })
    return result
  } catch (error) {
    throw new Error(error)
  }
}

const getCategoryBySlug = async (slug) => {
  try {
    const result = await getDB().collection(categoriesNewsName).findOne(
      { slug: slug }
    )
    return result
  } catch (error) {
    throw new Error(error)
  }
}

export const CategoriesModel = {
  getCategoryNews,
  getSubCategoryNews,
  getChildrenCategoryNews,
  getCategoryIdNew,
  postCategoryNew,
  putCategoryNew,
  deleteCategoryNew,
  getCategoryBySlug
}