import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDB from './config/database.js'
import connectCloudinary from './config/cloudinary.js'
import userRouter from './routes/user.route.js'
import productRouter from './routes/product.route.js'

const app = express()
const PORT = process.env.PORT || 4000

connectDB()
connectCloudinary()

app.use(express.json())
app.use(cors())
app.use('/api/user', userRouter)
app.use('/api/product', productRouter)




app.listen(PORT, () => console.log(`${PORT} connected`))