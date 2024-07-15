import Joi, { date } from 'joi'
import { ObjectId } from 'mongodb'
import { getDB } from "../config/mongodb"
import { seoTitle } from '../utilities/constants'

const newsCollectionName = 'newContent'

const newsCollectionSchema = Joi.object({
  name: Joi.string().trim().required(),
  slug: Joi.string().trim().required(),
  title: Joi.string().trim().default(null),
  description: Joi.string().trim().default(null),
  type: Joi.number().default(null),
  banner: Joi.string().default(null),
  link_banner: Joi.string().trim().default(null),
  thumb: Joi.string().default(null),
  link_thumb: Joi.string().trim().default(null),
  image: Joi.string().default(null),
  link_image: Joi.string().trim().default(null),
  video: Joi.string().default(null),
  status: Joi.array().items(Joi.string().valid('yeu_thich', 'moi', 'tieu_bieu')).default([]),
  subContent: Joi.string().default(null),
  content: Joi.string().required(),

  // danh muc
  categoryId: Joi.string().required(),
  subCategoryId: Joi.string().default(null),
  chidrenCategoryId: Joi.string().default(null),
  categorySlug: Joi.string().required().default(null),
  subCategorySlug: Joi.string().default(null),
  chidrenCategorySlug: Joi.string().default(null),
  categoryName: Joi.string().default(null),
  subCategoryName: Joi.string().default(null),

  view: Joi.number().default(80),
  tags: Joi.string().trim().default(null),

  createdAt: Joi.date().timestamp().default(Date.now()),
  updatedAt: Joi.date().timestamp().default(null),
  _destroy: Joi.boolean().default(false)
})

const validateSchema = async (data) => {
  return await newsCollectionSchema.validateAsync(data, { abortEarly: false })
}

const getNewsByCate = async (query) => {
  try {
    const type = query.type
    const slug = query.slug
    const page = query.page || 1
    const per_page = parseInt(query.perPage) || 20
    const result = await getDB().collection(newsCollectionName).find(
      { [type]: slug },
      { projection: {
        name: 1,
        slug: 1,
        thumb: 1,
        content: 1,
        tags: 1,
        categorySlug: 1,
        subCategorySlug: 1,
        chidrenCategorySlug: 1,
        categoryName: 1,
        subCategoryName: 1,
        createdAt: 1
      } }
    ).limit(per_page).skip((page - 1) * per_page).sort({ _id: -1 }).toArray()
    return result
  } catch (error) {
    throw new Error(error)
  }
}

const countNewsByCate = async (query) => {
  try {
    const type = query.type
    const slug = query.slug
    const result = await getDB().collection(newsCollectionName).count({ [type]: slug })
    return result
  } catch (error) {
    throw new Error(error)
  }
}

const postNew = async (data) => {
  try {
    const today = Date.now()
    data.createdAt = today
    const validatedValue = await validateSchema(data)
    const result = await getDB().collection(newsCollectionName).insertOne(validatedValue)
    return result
  } catch (error) {
    throw new Error(error)
  }
}

const findById = async (id) => {
  try {
    const result = await getDB().collection(newsCollectionName).findOne({ _id: ObjectId(id) })
    return result
  } catch (error) {
    throw new Error(error)
  }
}

const findBySlug = async (slug) => {
  try {
    const update = await getDB().collection(newsCollectionName).findOneAndUpdate(
      { slug: slug },
      { $inc: { view: 1 } }
    )
    const result = await getDB().collection(newsCollectionName).findOne(
      { slug: slug },
    )
    return result
  } catch (error) {
    throw new Error(error)
  }
}

const putNew = async (id, data) => {
  try {
    const result = await getDB().collection(newsCollectionName).findOneAndUpdate(
      { _id: ObjectId(id) },
      { $set: data },
      { returnOriginal: true }
    )
    return result
  } catch (error) {
    throw new Error(error)
  }
}

const putListNew = async (id, body) => {
  try {
    const result = await getDB().collection(newsCollectionName).update(
      { _id: { $in: id } },
      { $set: body },
      { multi: true }
    )
    return result
  } catch (error) {
    throw new Error(error)
  }
}

const deleteNew = async (id) => {
  try {
    const result = await getDB().collection(newsCollectionName).deleteOne({ _id: ObjectId(id) })
    return result
  } catch (error) {
    throw new Error(error)
  }
}

const findNewByCreatedAt = async (query) => {
  try {
    const page = query.page || 1
    const per_page = parseInt(query.perPage) || 10
    const result = await getDB().collection(newsCollectionName).find(
      {},
      { projection: {
        name: 1,
        slug: 1,
        thumb: 1,
        content: 1,
        tags: 1,
        categorySlug: 1,
        subCategorySlug: 1,
        chidrenCategorySlug: 1,
        categoryName: 1,
        subCategoryName: 1,
        createdAt: 1
      } }
    ).limit(per_page).skip((page - 1) * per_page).sort({ createdAt: -1 }).toArray()
    return result
  } catch (error) {
    throw new Error(error)
  }
}

const getNewsByTag = async (query) => {
  try {
    const page = query.page || 1
    const per_page = parseInt(query.perPage) || 20
    const tag = query.tag
    const result = await getDB().collection(newsCollectionName).find(
      { tags: { $regex: tag, $options: '$i' }},
      { projection: {
        name: 1,
        slug: 1,
        thumb: 1,
        tags: 1,
        categorySlug: 1,
        categoryName: 1,
        createdAt: 1
      } }
    ).limit(per_page).skip((page - 1) * per_page).toArray()
    return result
  } catch (error) {
    throw new Error(error)
  }
}

const countNewsByTag = async (query) => {
  try {
    const result = await getDB().collection(newsCollectionName).count(
      { tags: { $regex : query.tag, $options: '$i' }}
    )
    return result
  } catch (error) {
    throw new Error(error)
  }
}

const getTitleBySlug = async (value) => {
  try {
    const result = await getDB().collection(newsCollectionName).findOne(
      { slug: value },
      { projection: { title: 1, description: 1, thumb: 1 } }
    )
    if (!result) { return { title: seoTitle.title, description: seoTitle.description, thumb: process.env.IMAGES_LOGO }}
    result.thumb = `${process.env.REACT_APP_IMAGE}/new/${result.thumb}`
    return result
  } catch (error) {
    throw new Error(error)
  }
}

const searchTitle = async (data) => {
  try {
    const page = data.page || 1
    const per_page = parseInt(data.perPage) || 10
    const result = await getDB().collection(newsCollectionName).find(
      { name: {  $regex : data.search, $options: '$i' }}
    ).limit(per_page).skip((page - 1) * per_page).toArray()
    return result
  } catch (error) {
    throw new Error(error)
  }
}

const countSearchTitle = async (data) => {
  try {
    const result= await getDB().collection(newsCollectionName).count(
      { name: {  $regex : data.search, $options: '$i' } }
    )
    return result
  } catch (error) {
    throw new Error(error)
  }
}

export const NewsModel = {
  getNewsByCate,
  countNewsByCate,
  postNew,
  findById,
  findBySlug,
  putNew,
  putListNew,
  deleteNew,
  findNewByCreatedAt,
  getNewsByTag,
  countNewsByTag,
  getTitleBySlug,
  searchTitle,
  countSearchTitle
}