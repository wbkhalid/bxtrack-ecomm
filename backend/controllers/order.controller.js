import orderModel from "../models/orderModel.js"
import userModel from "../models/userModal.js"



const placeOrder = async (req, res) => {
    try {
        const { userId,orderData: orderdata } = req.body
        const {  items, amount, address } = orderdata



        const orderData = {
            userId,
            items,
            amount,
            address,
            paymentMethod: "COD",
            payment: false,
            data: Date.now()
        }
        console.log('111111111111');

        console.log(orderData)
        const newOrder = new orderModel(orderData)
        console.log('22222222222222');

        await newOrder.save()
        console.log('333333');


        await userModel.findByIdAndUpdate(userId, { cartData: {} })
        console.log('444444444');

        res.json({ success: true, message: 'order placed' })
    } catch (error) {
        console.log(error);

    }
}

const placeOrderStripe = async (req, res) => {

}

const placeOrderRazorpay = async (req, res) => {

}


const allOrders = async (req, res) => {

}
const userOrder = async (req, res) => {

}


const updateStatus = async (req, res) => {

}


export { placeOrder, placeOrderStripe, placeOrderRazorpay, allOrders, userOrder, updateStatus }