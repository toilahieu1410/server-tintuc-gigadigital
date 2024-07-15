import {MongoClient} from 'mongodb'
import { env } from './env'

let dbInstance = null

export const connectDB = async () => {
  const client = new MongoClient(env.MONGODB_URI, {
    useUnifiedTopology: true,
    useNewUrlParser: true
  })

  // connect the client to server
  await client.connect()

  dbInstance = client.db(env.DATABASE_NAME)
}

// get database instance
export const getDB = () => {
  if(!dbInstance) throw new Error('Must connection Database first!')
  return dbInstance
}