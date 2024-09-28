import React, { useContext } from 'react'
import CartTotal from '../components/CartTotal'
import { ShopContext } from '../context/ShopContext'

const PlaceOrder = () => {
    const { navigate } = useContext(ShopContext)
    return (
        <div className='flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-10 min-h-[80] border-t'>
            <div className='flex flex-col gap-4 w-full sm:max-w-[480px]'>

                <p className="text-xl md:text-2xl font-bold mb-4 text-center">Delivery Info</p>

                <div className='flex gap-3 mt-3'>
                    <input type="text" className='border border-gray-300 rounded py-1.5 px-3 w-full' placeholder='First Name' />
                    <input type="text" className='border border-gray-300 rounded py-1.5 px-3 w-full' placeholder='Last Name' />
                </div>

                <input type="email" className='border border-gray-300 rounded py-1.5 px-3 w-full' placeholder='Email Address' />
                <input type="text" className='border border-gray-300 rounded py-1.5 px-3 w-full' placeholder='address' />

                <div className='flex gap-3 mt-1'>
                    <input type="text" className='border border-gray-300 rounded py-1.5 px-3 w-full' placeholder='City' />
                    <input type="text" className='border border-gray-300 rounded py-1.5 px-3 w-full' placeholder='State' />
                </div>
                <div className='flex gap-3 mt-1'>
                    <input type="number" className='border border-gray-300 rounded py-1.5 px-3 w-full' placeholder='Zip code' />
                    <input type="text" className='border border-gray-300 rounded py-1.5 px-3 w-full' placeholder='Country' />
                </div>
                <input type="number" className='border border-gray-300 rounded py-1.5 px-3 w-full' placeholder='Phone Number' />
            </div>


            <div className='mt-8'>
                <div className='mt-8 min-w-80'>
                    <CartTotal />
                </div>
                <div className='w-full text-end'>
                    <button className='bg-black text-white text-sm my-8 py-3 px-8 active:bg-gray-700' onClick={() => navigate('/orders')}>Place order</button>
                </div>
            </div>
        </div>
    )
}

export default PlaceOrder
