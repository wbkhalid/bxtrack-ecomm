import { addToCart, updateCart, getUserCart } from '../controllers/cart.controller.js'
import express from 'express'


const cartRouter = express.Router()

cartRouter.post('/get', getUserCart)
cartRouter.post('/add', addToCart)
cartRouter.post('/update', updateCart)


export default cartRouter