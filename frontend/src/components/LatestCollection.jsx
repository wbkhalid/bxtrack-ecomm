import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import ProductItem from './ProductItem'

const LatestCollection = () => {
    const { products } = useContext(ShopContext)
    const [latestProducts, setLatestProducts] = useState([])

    useEffect(() => {
        setLatestProducts(products.slice(0, 8))
    }, [products])

    return (
        <div className='my-10'>
            <div className='text-center py-3 text-xl'>
                <h3 className="text-xl md:text-2xl font-bold mb-1">Latest Collections</h3>
                <p className='w-3/4 m-auto text-xs md:text-base text-gray-600 mb-5'>In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content.</p>
            </div>

            <div className='grid grid-col-2 sm:grid-cols-3 md:grid-cols-4  gap-4'>
                {
                    latestProducts?.map((item) => {
                        return (
                            <ProductItem key={item?.id} id={item?._id} name={item?.name} price={item?.price} image={item?.image} />
                        )
                    })
                }

            </div>

        </div>
    )
}

export default LatestCollection
