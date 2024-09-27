import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import { useParams } from 'react-router-dom'
import { assets } from '../assets/assets'

const Product = () => {
    const { products, currency, addToCart } = useContext(ShopContext)
    const { productId } = useParams()
    const [productData, setProductData] = useState(false)
    const [image, setImage] = useState('')
    const [size, setSize] = useState('')

    useEffect(() => {
        fetchProductData()
    }, [productId])

    console.log(products)
    const fetchProductData = async () => {
        products?.map((item) => {
            if (item?._id === productId) {
                setProductData(item)
                setImage(item.image[0])
                return null
            }
        })
    }

    return productData && (
        <div className='border-t-2 pt-10 transition-opacity ease-in duration-500 opacity-100'>
            <div className='flex gap-10 flex-col md:flex-row'>
                <div className="flex-1 flex justify-center items-center">
                    <img
                        src={image}
                        alt="Hero"
                        className="w-[100%] md:w-[90%] h-auto object-contain"
                    />
                </div>
                <div className="flex-1">
                    <h1 className='font-medium text-2xl mt-2'>{productData?.name}</h1>
                    <div className='flex items-center gap-1' >
                        <img src={assets.star_icon} alt="" className='w-3 5' />
                        <img src={assets.star_icon} alt="" className='w-3 5' />
                        <img src={assets.star_icon} alt="" className='w-3 5' />
                        <img src={assets.star_icon} alt="" className='w-3 5' />
                        <img src={assets.star_dull_icon} alt="" className='w-3 5' />
                        <p className='pl-2'>(122)</p>
                    </div>
                    <p className='mt-5 text-3xl font-medium'>{currency}{productData?.price}</p>
                    <p className='mt-5 text-gray-500 md:w-4/5'>{productData?.description}</p>
                    <div className='flex flex-col gap-4 my-8'>
                        <p>Select Size</p>
                        <div className='flex gap-2'>
                            {
                                productData?.sizes?.map(item => (<button className={`border py-2 px-4 bg-gray-100 ${item == size ? ' border-orange-500' : ""}`} onClick={() => setSize(item)}>{item}</button>))
                            }
                        </div>
                    </div>
                    <button className='bg-black text-white px-8 py-3 text-sm active:bg-gray-700' onClick={() => addToCart(productData?._id, size)}>Add to Cart</button>
                    <hr className='mt-8 sm:w-4/5' />
                    <div className='text-sm flex flex-col gap-1 text-gray-500 mt-5'>
                        <p>100% original Product</p>
                        <p>Cash on Deleivery</p>
                        <p>7 days return and exchage policy</p>
                    </div>
                </div>


            </div>
        </div>
    )
}

export default Product
