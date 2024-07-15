require('dotenv').config()

// Local
export const env = {
  MONGODB_URI: 'mongodb://AdminGiga:gigadigital@103.216.113.187:27017',
  // MONGODB_URI: process.env.MONGODB_URI_LOCAL,
  DATABASE_NAME: process.env.DATABASE_NAME,
  IMAGES_URI: process.env.IMAGES_URI,
}