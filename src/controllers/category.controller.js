import { HttpStatusCode } from "../utilities/constants"
import { CategoryService } from '../services/category.service'

const getCategoryNews = async (req, res) => {
  try {
    const type = 0
    const result = await CategoryService.getCategoryNews(type)
    res.status(HttpStatusCode.OK).json(result)
  } catch (error) {
    res.status(HttpStatusCode.INTERNAL_SERVER).json({
      errors: error.message
    })
  }
}

const postCategoryNew = async (req, res) => {
  try {
    const result = await CategoryService.postCategoryNew(req.body)
    res.status(HttpStatusCode.OK).json({...result, message: 'Tạo danh mục thành công!'})
  } catch (error) {
    res.status(HttpStatusCode.INTERNAL_SERVER).json({
      errors: error.message
    })
  }
}

const putCategoryNew = async (req, res) => {
  try {
    const {id} = req.params
    const result = await CategoryService.putCategoryNew(id, req.body)
    res.status(HttpStatusCode.OK).json({...result, message: 'Cập nhật thành công!'})
  } catch (error) {
    res.status(HttpStatusCode.INTERNAL_SERVER).json({
      errors: error.message
    })
  }
}

const deleteCategoryNew = async (req, res) => {
  try {
    const {id} = req.params
    const result = await CategoryService.deleteCategoryNew(id)
    res.status(HttpStatusCode.OK).json({...result, message: 'Xóa thành công!'})
  } catch (error) {
    res.status(HttpStatusCode.INTERNAL_SERVER).json({
      errors: error.message
    })
  }
}

const getCategoryBySlug = async (req, res) => {
  try {
    const { slug } = req.params
    const result = await CategoryService.getCategoryBySlug(slug)
    res.status(HttpStatusCode.OK).json(result)
  } catch (error) {
    res.status(HttpStatusCode.INTERNAL_SERVER).json({
      errors: error.message
    })
  }
}

const getSubCategoryNews = async (req, res) => {
  try {
    const {id} = req.params
    const result = await CategoryService.getSubCategoryNews(id)
    res.status(HttpStatusCode.OK).json(result)
  } catch (error) {
    res.status(HttpStatusCode.INTERNAL_SERVER).json({
      errors: error.message
    })
  }
}

export const CategoryController = {
  getCategoryNews,
  postCategoryNew,
  putCategoryNew,
  deleteCategoryNew,
  getCategoryBySlug,
  getSubCategoryNews
}