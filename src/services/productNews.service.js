import { ProductNewsModel } from "../models/productNews.model"

const getProductNewsById = async(id) => {
  try {
    const result = await producProductNewsModeltNewsModel.getProductNewsById(id)
    return result
  } catch (error) {
    throw new Error(error)
  }
}

const getProductNewsBySlug = async(slug) => {
  try {
    const result = await ProductNewsModel.getProductNewsBySlug(slug)
    return result
  } catch (error) {
    throw new Error(error)
  }
}

const postProductNews = async (body) => {
  try {
    const result = await ProductNewsModel.postProductNews(body)
    return result
  } catch (error) {
    throw new Error(error)
  }
}

const deleteProductNews = async(id) => {
  try {
    const result = await ProductNewsModel.deleteProductNews(id)
    return result
  } catch (error) {
    throw new Error(error)
  }
}

export const ProductNewsService = {
  getProductNewsById,
  getProductNewsBySlug,
  postProductNews,
  deleteProductNews
}