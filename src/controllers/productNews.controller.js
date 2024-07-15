import { HttpStatusCode } from "../utilities/constants"
import { ProductNewsService } from "../services/productNews.service"

const getProductNewsById = async(req, res) => {
  try {
    const { id } = req.params
    const result = await ProductNewsService.getProductNewsById(id)
    res.status(HttpStatusCode.OK).json(result)
  } catch (error) {
    res.status(HttpStatusCode.INTERNAL_SERVER).json({
      errors: error.message
    })
  }
}

const getProductNewsBySlug = async(req, res) => {
  try {
    const { slug } = req.params
    const result = await ProductNewsService.getProductNewsBySlug(slug)
    res.status(HttpStatusCode.OK).json(result)
  } catch (error) {
    res.status(HttpStatusCode.INTERNAL_SERVER).json({
      errors: error.message
    })
  }
}

const postProductNews = async(req, res) => {
  try {
    const result = await ProductNewsService.postProductNews(req.body)
    res.status(HttpStatusCode.OK).json({...result, message: 'Tạo thành công!'})
  } catch (error) {
    res.status(HttpStatusCode.INTERNAL_SERVER).json({
      errors: error.message
    })
  }
}

const deleteProductNews = async(req, res) => {
  try {
    const { id } = req.params
    const result = await ProductNewsService.deleteProductNews(id)
    res.status(HttpStatusCode.OK).json({...result, message: 'Xóa thành công!'})
  } catch (error) {
    res.status(HttpStatusCode.INTERNAL_SERVER).json({
      errors: error.message
    })
  }
}

export const ProductNewsController = {
  getProductNewsById,
  getProductNewsBySlug,
  postProductNews,
  deleteProductNews
}