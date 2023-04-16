require('dotenv').config()

//general config project
export const config = {
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  port: process.env.PORT || 4000,
  database: process.env.DB_NAME,
  host: process.env.HOST
}

//config cloudinary
export const CloudinaryConfig = {
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
}
