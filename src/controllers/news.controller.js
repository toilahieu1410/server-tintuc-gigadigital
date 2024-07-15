import { HttpStatusCode } from "../utilities/constants"
import { NewsService } from '../services/news.service'

const getNewsByCate = async (req, res) => {
  try {
    const query = req.query
    const result = await NewsService.getNewsByCate(query)
    res.status(HttpStatusCode.OK).json(result)
  } catch (error) {
    res.status(HttpStatusCode.INTERNAL_SERVER).json({
      errors: error.message
    })
  }
}

const postNew = async (req, res) => {
  try {
    const result = await NewsService.postNew(req.body)
    res.status(HttpStatusCode.OK).json({...result, message: 'Tạo thành công!'})
  } catch (error) {
    res.status(HttpStatusCode.INTERNAL_SERVER).json({
      errors: error.message
    })
  }
}

const findById = async (req, res) => {
  try {
    const { id } = req.params
    const result = await NewsService.findById(id)
    res.status(HttpStatusCode.OK).json(result)
  } catch (error) {
    res.status(HttpStatusCode.INTERNAL_SERVER).json({
      errors: error.message
    })
  }
}

const findBySlug = async (req, res) => {
  try {
    const { slug } = req.params
    const result = await NewsService.findBySlug(slug)
    res.status(HttpStatusCode.OK).json(result)
  } catch (error) {
    res.status(HttpStatusCode.INTERNAL_SERVER).json({
      errors: error.message
    })
  }
}

const putNew = async (req, res) => {
  try {
    const {id} = req.params
    const result = await NewsService.putNew(id, req.body)
    res.status(HttpStatusCode.OK).json({...result, message: 'Sửa thành công!'})
  } catch (error) {
    res.status(HttpStatusCode.INTERNAL_SERVER).json({
      errors: error.message
    })
  }
}

const putListNew = async (req, res) => {
  try {
    const {_id} = req.query
    const result = await NewsService.putListNew(_id, req.body)
    res.status(HttpStatusCode.OK).json({...result, message: 'Sửa thành công!'})
  } catch (error) {
    res.status(HttpStatusCode.INTERNAL_SERVER).json({
      errors: error.message
    })
  }
}

const deleteNew = async (req, res) => {
  try {
    const {id} = req.params
    const result = await NewsService.deleteNew(id)
    res.status(HttpStatusCode.OK).json({...result, message: 'Xóa thành công!'})
  } catch (error) {
    res.status(HttpStatusCode.INTERNAL_SERVER).json({
      errors: error.message
    })
  }
}

const findNewFromHome = async (req, res) => {
  try {
    const result = await NewsService.findNewFromHome()
    res.status(HttpStatusCode.OK).json(result)
  } catch (error) {
    res.status(HttpStatusCode.INTERNAL_SERVER).json({
      errors: error.message
    })
  }
}

const findNewByCreatedAt = async (req, res) => {
  try {
    const query = req.query
    const result = await NewsService.findNewByCreatedAt(query)
    res.status(HttpStatusCode.OK).json(result)
  } catch (error) {
    res.status(HttpStatusCode.INTERNAL_SERVER).json({
      errors: error.message
    })
  }
}

const getNewsByTag = async (req, res) => {
  try {
    const result = await NewsService.getNewsByTag(req.query)
    res.status(HttpStatusCode.OK).json(result)
  } catch (error) {
    res.status(HttpStatusCode.INTERNAL_SERVER).json({
      errors: error.message
    })
  }
}

const getTitleBySlug = async (req, res) => {
  try {
    const query = req.query
    const result = await NewsService.getTitleBySlug(query)
    res.status(HttpStatusCode.OK).json(result)
  } catch (error) {
    res.status(HttpStatusCode.INTERNAL_SERVER).json({
      errors: error.message
    })
  }
}

const searchTitle = async (req, res) => {
  try {
    const result = await NewsService.searchTitle(req.query)
    res.status(HttpStatusCode.OK).json(result)
  } catch (error) {
    res.status(HttpStatusCode.INTERNAL_SERVER).json({
      errors: error.message
    })
  }
}

export const NewsController = {
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