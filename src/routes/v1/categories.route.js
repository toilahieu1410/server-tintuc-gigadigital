import express from "express"
import { CategoryController } from '../../controllers/category.controller'

const router = express.Router()

router.route('/')
  .get(CategoryController.getCategoryNews)
  .post(CategoryController.postCategoryNew)

router.route('/:id')
  .put(CategoryController.putCategoryNew)
  .delete(CategoryController.deleteCategoryNew)

router.route('/slug/:slug')
  .get(CategoryController.getCategoryBySlug)

router.route('/sub-cate/:id')
  .get(CategoryController.getSubCategoryNews)

export const categoryRoutes = router