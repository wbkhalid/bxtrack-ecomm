import React, { useContext } from 'react'
import { ShopContext } from '../context/ShopContext'

const CartTotal = () => {
    const { currency, deliveryFee, getCartAmount } = useContext(ShopContext)
    return (
        <div className='w-full'>
            <div className='text-2xl'>
                <p className="text-xl md:text-2xl font-bold mb-4 text-center"> Cart Total</p>
            </div>
            <div className='flex flex-col gap-2 mt-2 text-sm'>
                <div className='flex justify-between'>
                    <p>Sub Total</p>
                    <p>{currency}{getCartAmount()}</p>
                </div>
                <div className='flex justify-between'>
                    <p>Shipping Fee</p>
                    <p>{currency}{deliveryFee}</p>
                </div>
                <div className='flex justify-between'>
                    <p>Total</p>
                    <p>{currency}{getCartAmount() === 0 ? 0 : getCartAmount() + deliveryFee}</p>
                </div>
            </div>
        </div>
    )
}

export default CartTotal
