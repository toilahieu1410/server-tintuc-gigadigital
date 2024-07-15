import Joi, { date } from 'joi'
import { ObjectId } from 'mongodb'
import { getDB } from "../config/mongodb"

const productNewsName = ' productNews'

const productNewsSchema = Joi.object({
  name: Joi.string().trim().required(),
  link: Joi.string().trim().required(),
  id_news: Joi.string().trim().required(),
  slug_new: Joi.string().trim().required(),
  createdAt: Joi.date().timestamp().default(Date.now()),
  updatedAt: Joi.date().timestamp().default(null),
  _destroy: Joi.boolean().default(false)
})

const validateSchema = async (data) => {
  return await productNewsSchema.validateAsync(data, { abortEarly: false })
}

const getProductNewsById = async (id) => {
  try {
    const result = await getDB().collection(productNewsName).find(
      { id_news: id.toString() }
    ).toArray()
    return result
  } catch (error) {
    throw new Error(error)
  }
}

const getProductNewsBySlug = async(slug) => {
  try {
    const result = await getDB().collection(productNewsName).find(
      { slug_new: slug }
    ).toArray()
    return result
  } catch (error) {
    throw new Error(error)
  }
}

const postProductNews = async(data) => {
  try {
    const validatedValue = await validateSchema(data)
    const result = await getDB().collection(productNewsName).insertOne(validatedValue)
    return result
  } catch (error) {
    throw new Error(error)
  }
}

const deleteProductNews = async(id) => {
  try {
    const result = await getDB().collection(productNewsName).deleteOne(
      { _id: ObjectId(id) }
    )
    return result
  } catch (error) {
    throw new Error(error)
  }
}

export const ProductNewsModel = {
  getProductNewsById,
  getProductNewsBySlug,
  postProductNews,
  deleteProductNews
}