import { createContext, useState } from "react";
import { products } from "../assets/assets";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";


export const ShopContext = createContext()

const ShopContextProvider = ({ children }) => {
    const currency = '$'
    const deliveryFee = 10

    const [cartItems, setCartItems] = useState({})
    const navigate = useNavigate()

    const addToCart = (itemId, size) => {
        if (!size) {
            toast.error("Please Select Size of the Product")
            return
        }

        let cartData = structuredClone(cartItems)
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
        setCartItems(cartData)
        toast.success("Product added into Cart")
    }

    const getCartCount = () => {
        let totalCount = 0
        for (let items in cartItems) {
            for (let item in cartItems[items]) {
                if (cartItems[items][item] > 0) {
                    totalCount += cartItems[items][item]
                }
            }
        }
        return totalCount
    }

    const updateQuantity = async (itemId, size, quantity) => {
        let cartData = structuredClone(cartItems)
        cartData[itemId][size] = quantity
        setCartItems(cartData)
    }

    const getCartAmount = () => {
        let totalAmount = 0
        for (let items in cartItems) {
            let itemInfo = products?.find((product) => product?._id === items)
            for (let item in cartItems[items]) {
                try {
                    if (cartItems[items][item] > 0) {
                        totalAmount = itemInfo?.price * cartItems[items][item]
                    }
                } catch (error) {
                    console.log(error);

                }
            }
        }
        return totalAmount
    }

    const value = { currency, deliveryFee, products, addToCart, cartItems, getCartCount, updateQuantity, getCartAmount, navigate }
    return (
        <ShopContext.Provider value={value}>
            {children}
        </ShopContext.Provider>
    )
}

export default ShopContextProvider