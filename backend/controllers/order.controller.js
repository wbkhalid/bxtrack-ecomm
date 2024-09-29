import orderModel from "../models/orderModel.js"
import userModel from "../models/userModal.js"



const placeOrder = async (req, res) => {
    try {
        const { userId, items, amount, address } = req.body

        const orderData = {
            userId,
            items,
            amount,
            address,
            paymentMethod: "COD",
            payment: false,
            data: Date.now()
        }

        const newOrder = new orderModel(orderData)
        await newOrder.save()

        await userModel.findByIdAndUpdate(userId, { cartData: {} })
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