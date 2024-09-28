import React, { useContext } from 'react'
import { ShopContext } from '../context/ShopContext'

const Orders = () => {
    const { products, currency } = useContext(ShopContext)

    return (
        <div className='border-t pt-10'>
            <p className="text-xl md:text-2xl font-bold mb-4 text-center">My Orders</p>

            <div>
                {
                    products?.slice(1, 4)?.map((item) => (
                        <div className='py-4 bordrr-t border-b text-gray-600 flex flex-col md:flex-row items-center md:justify-between gap-4'>
                            <div className='flex items-start gap-6 text-sm'>
                                <img className='w-16 sm:w-20' src={item?.image[0]} alt="" />
                                <div className=''>
                                    <p className='sm:text-base font-medium'>
                                        {item?.name}
                                    </p>
                                    <div className='flex items-center gap-3 mt-2 text-base text-gray-700'>
                                        <p className='text-lg'>{currency}{item?.price}</p>
                                        <p>Quantity:1</p>
                                        <p>Size:M</p>
                                    </div>
                                    <p className='mt-2'>Date: <span className='text-gray-400'>Sep 28,2024</span></p>
                                </div>
                            </div>
                            <div className='md:w-1/2 flex justify-between'>
                                <div className='flex items-center gap-2'>
                                    <p className='min-w-2 h-2 rounded-full bg-green-500'></p>
                                    <p className='text-sm md:text-base'>Ready to Ship</p>
                                </div>
                                <button className='border px-4 py-2 text-sm rounded-sm'>Track Order</button>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default Orders
