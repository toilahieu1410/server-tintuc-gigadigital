import express from "express"
import { HttpStatusCode } from '../../utilities/constants'
import { categoryRoutes } from './categories.route'
import { newsRoutes } from './news.route'
import { productNewsRoutes } from "./productNews.route"

const router = express.Router()

router.get('/status', (req, res) => res.status(HttpStatusCode.OK).json({status: 'OK'}))

// categories api
router.use('/categories', categoryRoutes)

// news api
router.use('/news', newsRoutes)

// product news api
router.use('/product-news', productNewsRoutes)

export const apiV1 = router