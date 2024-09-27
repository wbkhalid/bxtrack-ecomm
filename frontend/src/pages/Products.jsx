import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import { assets } from '../assets/assets';
import ProductItem from '../components/ProductItem';

const Products = () => {
    const { products } = useContext(ShopContext);
    const [showFilter, setShowFilter] = useState(false);
    const [filterProducts, setFilterProducts] = useState([]);
    const [category, setCategory] = useState([]);
    const [sortType, setSortType] = useState();

    useEffect(() => {
        applyFilter()
    }, [category])
    useEffect(() => {
        sortProducts()
    }, [sortType])

    const applyFilter = () => {
        let productCopy = products.slice()
        if (category.length > 0) {
            productCopy = productCopy?.filter(item => category.includes(item?.category))
        }
        setFilterProducts(productCopy)
    }


    const toggleCategory = (e) => {
        if (category.includes(e.target.value)) {
            setCategory(prev => prev?.filter((item) => item !== e.target.value))
        } else {
            setCategory(prev => [...prev, e.target.value])
        }
    }

    const sortProducts = () => {
        let priceProductCopy = products.slice()

        switch (sortType) {
            case 'low-high':
                setFilterProducts(priceProductCopy.sort((a, b) => a.price - b.price))
                break;
            case 'high-low':
                setFilterProducts(priceProductCopy.sort((a, b) => b.price - a.price))
                break;

            default:
                applyFilter()
                break;
        }
    }

    return (
        <div className='flex flex-col sm:flex-row gap-1 sm:gap-5 pt-10 '>
            <div className='min-w-60'>
                <p className='my-2 text-xl flex items-center cursor-pointer gap-2' onClick={() => setShowFilter(!showFilter)}>
                    Filters
                    <img
                        src={assets.dropdown_icon}
                        alt=""
                        className={`h-3 sm:hidden ${showFilter ? 'rotate-90' : ''}`}
                    />
                </p>

                <div className={`border border-gray-500 pl-5 py-3 mt-6 ${showFilter ? '' : 'hidden'} md:block`}>
                    <div className='mb-3 text-sm font-medium'>CATEGORIES</div>
                    <div className='flex flex-col gap-2 text-sm font-light text-gray-700'>
                        <p className='flex gap-2'>
                            <input type="checkbox" className='w-3' value={'Men'} onChange={toggleCategory} />Men
                        </p>
                        <p className='flex gap-2'>
                            <input type="checkbox" className='w-3' value={'Women'} onChange={toggleCategory} />Women
                        </p>
                        <p className='flex gap-2'>
                            <input type="checkbox" className='w-3' value={'Kids'} onChange={toggleCategory} />Kids
                        </p>
                    </div>
                </div>
            </div>

            <div className='flex-1'>
                <div className='flex justify-between align-center text-base sm:text-2xl mb-4'>
                    <p className="text-xl md:text-2xl font-bold mb-4 ">All Products</p>
                    <select className='border-2 border-gray-300 text-sm px-2' onChange={(e) => setSortType(e.target.value)}>
                        <option value="relavent">Sort by: Relavent</option>
                        <option value="low-high">Sort by:Low to High</option>
                        <option value="high-low">Sort by: High to Low</option>
                    </select>
                </div>

                <div className='grid grid-col-2 sm:grid-cols-3 md:grid-cols-4  gap-4'>
                    {
                        filterProducts?.map((item) => {
                            return (
                                <ProductItem key={item?.id} id={item?._id} name={item?.name} price={item?.price} image={item?.image} />
                            )
                        })
                    }
                </div>
            </div>

        </div>
    );
};

export default Products;
