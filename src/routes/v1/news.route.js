import express from "express"
import { NewsController } from '../../controllers/news.controller'

const router = express.Router()

router.route('/')
  .get(NewsController.getNewsByCate)
  .post(NewsController.postNew)

router.route('/from-home')
  .get(NewsController.findNewFromHome)

router.route('/bai-viet-moi')
  .get(NewsController.findNewByCreatedAt)

router.route('/slug/:slug')
  .get(NewsController.findBySlug)

router.route('/list')
  .put(NewsController.putListNew)

router.route('/tag')
  .get(NewsController.getNewsByTag)

router.route('/seo')
  .get(NewsController.getTitleBySlug)

router.route('/search')
  .get(NewsController.searchTitle)

router.route('/:id')
  .get(NewsController.findById)
  .put(NewsController.putNew)
  .delete(NewsController.deleteNew)

export const newsRoutes = router