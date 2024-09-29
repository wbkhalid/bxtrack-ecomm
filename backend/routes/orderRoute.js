import express from 'express'
import { placeOrder, placeOrderStripe, placeOrderRazorpay, userOrder, updateStatus, allOrders } from '../controllers/order.controller.js'
import adminAuth from '../middleware/adminAuth.js'
import authUser from '../middleware/auth.js'

const orderRouter = express.Router()

orderRouter.post('/list', adminAuth, allOrders)
orderRouter.post('/status', adminAuth, updateStatus)

orderRouter.post('/place', authUser, placeOrder)
orderRouter.post('/stripe', authUser, placeOrderStripe)
orderRouter.post('/razorpay', authUser, placeOrderRazorpay)

orderRouter.post('/userorders', authUser, userOrder)


export default orderRouter


