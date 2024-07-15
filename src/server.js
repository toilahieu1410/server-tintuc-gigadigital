import express from 'express'
import cors from 'cors'
import { connectDB } from './config/mongodb'
import { apiV1 } from './routes/v1'
import { env } from './config/env'

const APP_PORT = 8005

connectDB()
  .then(() => {
    console.log('Connected successfully to Database server!')
  })
  .then(() => bootServer())
  .catch((error) => {
    console.log(error)
    process.exit(1)
  })

const bootServer = () => {
  const app = express()

  // cors
  app.use(cors())
  // app.use(cors(corsOptions))

  // request body data
  app.use(express.urlencoded({extended: true}))
  app.use(express.json())

  // app.use(formidable({uploadDir: './src/public'}))

  app.use('/image', express.static(`${env.IMAGES_URI}`))

  // use APIs
  app.use('/v1', apiV1)

  // Local
  app.listen(APP_PORT , () => {
    console.log(`Server running at port: ${APP_PORT}`)
  })
}