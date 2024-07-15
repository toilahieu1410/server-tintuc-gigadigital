import express from "express"
import { ProductNewsController } from '../../controllers/productNews.controller'

const router = express.Router()

// lay theo id bai viet
router.route('/id/:id')
  .get(ProductNewsController.getProductNewsById)

// lay theo slug bai viet
router.route('/slug/:slug')
  .get(ProductNewsController.getProductNewsBySlug)

router.route('/')
  .post(ProductNewsController.postProductNews)

router.route('/:id')
  .delete(ProductNewsController.deleteProductNews)

export const productNewsRoutes = router