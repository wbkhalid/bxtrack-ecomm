import { createContext } from "react";
import { products } from "../assets/assets";


export const ShopContext = createContext()

const ShopContextProvider = ({ children }) => {
    const currency = '$'
    const deliveryFee = 10
    const value = { currency, deliveryFee, products }

    return (
        <ShopContext.Provider value={value}>
            {children}
        </ShopContext.Provider>
    )
}

export default ShopContextProvider