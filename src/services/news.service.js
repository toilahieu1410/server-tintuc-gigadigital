import { NewsModel } from '../models/news.model'
import { CategoriesModel } from '../models/categories.model'
import { ProductNewsModel } from '../models/productNews.model'
import { ObjectId } from 'mongodb'
import { seoTitle } from '../utilities/constants'

const getNewsByCate = async (query) => {
  try {
    const data = await NewsModel.getNewsByCate(query)
    const count = await NewsModel.countNewsByCate(query)
    return { data: data, count: count }
  } catch (error) {
    throw new Error(error)
  }
}

const postNew = async (data) => {
  try {
    const dataPostNew = await NewsModel.postNew(data)
    const result = await NewsModel.findById(dataPostNew.insertedId)
    return result
  } catch (error) {
    throw new Error(error)
  }
}

const findById = async (id) => {
  try {
    const result = await NewsModel.findById(id)
    const product = await ProductNewsModel.getProductNewsById(id)
    result.product = product
    return result
  } catch (error) {
    throw new Error(error)
  }
}

const findBySlug = async (slug) => {
  try {
    const result = await NewsModel.findBySlug(slug)
    const product = await ProductNewsModel.getProductNewsBySlug(slug)
    result.product = product
    return result
  } catch (error) {
    throw new Error(error)
  }
}

const putNew = async (id, data) => {
  try {
    const dataPutNew = await NewsModel.putNew(id, data)
    const result = await NewsModel.findById(id)
    return result
  } catch (error) {
    throw new Error(error)
  }
}

const putListNew = async (id, body) => {
  try {
    const idObj = id.map(item => ObjectId(item))
    const data = {
      categoryId: body.categoryId,
      categorySlug: body.categorySlug,
      subCategoryId: body.subCategoryId,
      subCategorySlug: body.subCategorySlug,
      categoryName: body.categoryName,
      subCategoryName: body.subCategoryName
    }
    const result = await NewsModel.putListNew(idObj, data)
    return result
  } catch (error) {
    throw new Error(error)
  }
}

const deleteNew = async (id) => {
  try {
    const result = await NewsModel.deleteNew(id)
    return {...result, _id: id}
  } catch (error) {
    throw new Error(error)
  }
}

const findNewFromHome = async () => {
  try {
    const type = 0
    const data = await CategoriesModel.getCategoryNews(type)
    for(let item = 0; item < data.length; item ++) {
      const query = {
        type: 'categorySlug',
        slug: data[item].slug,
        page: 1,
        perPage: 10
      }
      const dataResult = await NewsModel.getNewsByCate(query)
      data[item].news = dataResult
    }
    return data
  } catch (error) {
    throw new Error(error)
  }
}

const findNewByCreatedAt = async (query) => {
  try {
    const result = await NewsModel.findNewByCreatedAt(query)
    return result
  } catch (error) {
    throw new Error(error)
  }
}

const getNewsByTag = async (query) => {
  try {
    const data = await NewsModel.getNewsByTag(query)
    const count = await NewsModel.countNewsByTag(query)
    const result = {
      data: data,
      count: count,
      keyword: query.tag
    }
    return result
  } catch (error) {
    throw new Error(error)
  }
}

const getTitleBySlug = async (query) => {
  try {
    if(!query.type || !query.value) {
      const result = { title: seoTitle.title, description: seoTitle.description, thumb: process.env.IMAGES_LOGO }
      return result
    }

    if(query.type == 'new') {
      const result = await NewsModel.getTitleBySlug(query.value)
      return result
    }

  } catch (error) {
    throw new Error(error)
  }
}

const searchTitle = async (data) => {
  try {
    const dataResult = await NewsModel.searchTitle(data)
    const count = await NewsModel.countSearchTitle(data)
    const result = {
      result: dataResult,
      count: count,
      keyword: data.search
    }
    return result
  } catch (error) {
    throw new Error(error)
  }
}

export const NewsService = {
  getNewsByCate,
  postNew,
  findById,
  findBySlug,
  putNew,
  putListNew,
  deleteNew,
  findNewFromHome,
  findNewByCreatedAt,
  getNewsByTag,
  getTitleBySlug,
  searchTitle
}