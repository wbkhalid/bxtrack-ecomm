import { createContext, useEffect, useState } from "react";
import { products } from "../assets/assets";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from 'axios';


export const ShopContext = createContext()

const ShopContextProvider = ({ children }) => {
    const currency = '$'
    const deliveryFee = 10
    const backend_url = import.meta.env.VITE_BACKEND_URL

    const [cartItems, setCartItems] = useState({})
    const [products, setProducts] = useState([])
    const [token, setToken] = useState('')
    const navigate = useNavigate()

    const addToCart = async (itemId, size) => {
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

        if (token) {
            try {
                await axios.post(`${backend_url}/api/cart/add`, { itemId, size }, { headers: { token } })
            } catch (error) {
                console.log(error);
            }
        }

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
        try {
            if (token) {
                try {
                    await axios.post(`${backend_url}/api/cart/update`, { itemId, size, quantity }, { headers: { token } })
                } catch (error) {
                    console.log(error);
                }
            }
        } catch (error) {
            console.log(error);

        }
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


    const getUserCart = async (token) => {
        try {
            await axios.post(`${backend_url}/api/cart/get`, {}, { headers: { token } })
            if (response.data.success) {
                setCartItems(response.data.cartData)
            }
        } catch (error) {
            console.log(error);
        }
    }

    const getProductsData = async () => {
        try {
            const response = await axios.get(`${backend_url}/api/product/list`)

            if (response.data.success) {
                setProducts(response.data.products)
            }

        } catch (error) {
            console.log(error);

        }
    }

    useEffect(() => {
        getProductsData()
    }, [])

    useEffect(() => {
        if (!token && localStorage.getItem('token')) {
            setToken(localStorage.getItem('token'))
            getUserCart(localStorage.getItem('token'))
        }
    }, [])

    const value = { currency, deliveryFee, products, addToCart, cartItems, getCartCount, updateQuantity, getCartAmount, navigate, backend_url, token, setToken, setCartItems }
    return (
        <ShopContext.Provider value={value}>
            {children}
        </ShopContext.Provider>
    )
}

export default ShopContextProvider