import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import { assets } from '../assets/assets'
import CartTotal from '../components/CartTotal'

const Cart = () => {
  const { products, currency, cartItems, updateQuantity, navigate } = useContext(ShopContext)
  const [cartData, setCartData] = useState()

  useEffect(() => {
    if (products.length > 0) {
      const tempData = []
      for (const items in cartItems) {
        for (const item in cartItems[items]) {
          if (cartItems[items][item] > 0) {
            tempData.push({
              _id: items,
              size: item,
              quantity: cartItems[items][item]
            })
          }
        }
      }
      setCartData(tempData)
    }

  }, [cartItems, products])
  return (
    <div className='border-t pt-15'>
      <div className='text-2xl mb-3'>
        <p className="text-xl md:text-2xl font-bold mb-4 text-center">Your Cart</p>
      </div>

      <div>
        {
          cartData?.map((item) => {
            const productData = products?.find((product) => product?._id == item?._id)
            return (
              <div className='py-4 border-t border-b text-gray-700 grid grid-cols-[4fr_0.5fr_0.5fr] sm:grid-cols-[4fr_2fr_0.5fr] items-center gap-4'>
                <div className='flex items-start gap-6'>
                  <img src={productData?.image[0]} alt="" className='w-16 sm:w-20' />
                  <div>
                    <p className='text-xs sm:text-l font-medium'>
                      {productData?.name}
                    </p>
                    <div className='flex items-center gap-5 mt-1'>
                      <p>{currency}{productData?.price}</p>
                      <p className='px-2 sm:py-1 border bg-slate-50'>{item?.size}</p>
                    </div>
                  </div>
                </div>
                <input className='border max-w-10 sm:max-w-20 p-1' type="number" min={1} defaultValue={item?.quantity} onChange={(e) => e.target.value == '' || e.target.value == 0 ? null : updateQuantity(item?._id, item?.size, Number(e.target.value))} />
                <img src={assets?.bin_icon} alt="" className='w-4 mr-4 sm:w-5 cursor-pointer' onClick={(() => updateQuantity(item?._id, item?.size, 0))} />
              </div>
            )
          })
        }
      </div>

      <div className='flex justify-end my-20'>
        <div className='w-full sm:w-[450px]'>
          <CartTotal />
          <div className='w-full text-end'>
            <button className='bg-black text-white text-sm my-8 py-3 px-8 active:bg-gray-700' onClick={() => navigate('/place-order')}>Proceed to Checkout</button>
          </div>
        </div>

      </div>

    </div>
  )
}

export default Cart
