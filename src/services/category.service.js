import { CategoriesModel } from '../models/categories.model'

const getCategoryNews = async (data) => {
  try {
    const result = await CategoriesModel.getCategoryNews(data)
    return result
  } catch (error) {
    throw new Error(error)
  }
}

const postCategoryNew = async (data) => {
  try {
    const createNew = await CategoriesModel.postCategoryNew(data)
    const result = await CategoriesModel.getCategoryIdNew(createNew.insertedId)
    return result
  } catch (error) {
    throw new Error(error)
  }
}

const putCategoryNew = async (id, body) => {
  try {
    if(body._id) { delete body._id }
    const data = await CategoriesModel.putCategoryNew(id, body)
    const result = await CategoriesModel.getCategoryIdNew(id)
    return result
  } catch (error) {
    throw new Error(error)
  }
}

const deleteCategoryNew = async (id) => {
  try {
    const result = await CategoriesModel.deleteCategoryNew(id)
    return {...result, _id: id}
  } catch (error) {
    throw new Error(error)
  }
}

const getCategoryBySlug = async (slug) => {
  try {
    const result = await CategoriesModel.getCategoryBySlug(slug)
    return result
  } catch (error) {
    throw new Error(error)
  }
}

const getSubCategoryNews = async (id) => {
  try {
    const result = await CategoriesModel.getSubCategoryNews(id)
    return result
  } catch (error) {
    throw new Error(error)
  }
}

export const CategoryService = {
  getCategoryNews,
  postCategoryNew,
  putCategoryNew,
  deleteCategoryNew,
  getCategoryBySlug,
  getSubCategoryNews
}