import userModel from '../models/userModal.js'

const addToCart = async (req, res) => {
    try {
        const { userId, itemId, size } = req.body
        const userData = await userModel.findById(userId)
        let cartData = userData.cartData

        if (cartData[itemId]) {
            if (cartData[itemId][size]) {
                cartData[itemId][size] += 1
            } else {
                cartData[itemId][size] = 1
            }
        } else {
            cartData[itemId] = {}
            cartData[itemId][size] = 1
        }

        await userModel.findByIdAndUpdate(userId, { cartData })
        res.json({ success: true, message: 'Added to cart' })
    } catch (error) {
        console.log(error);
        res.json({ success: true, message: error.message })
    }
}

const updateCart = async (req, res) => {
    try {
        const { userId, itemId, size, quantity } = req.body
        const userData = await userModel.findById(userId)
        let cartData = userData.cartData

        cartData[itemId][size] = quantity

        await userModel.findByIdAndUpdate(userId, { cartData })
        res.json({ success: true, message: 'Cart updated' })
    } catch (error) {
        console.log(error);
        res.json({ success: true, message: error.message })
    }
}


const getUserCart = async (req, res) => {
    try {
        const { userId } = req.body
        const userData = await userModel.findById(userId)
        let cartData = userData.cartData

        res.json({ success: true, cartData })
    } catch (error) {
        console.log(error);
        res.json({ success: true, message: error.message })
    }
}

export { addToCart, updateCart, getUserCart }