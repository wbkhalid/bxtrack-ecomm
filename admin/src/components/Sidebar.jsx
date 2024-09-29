import React from 'react'
import { NavLink } from 'react-router-dom'
import { assets } from '../assets/assets'

const Sidebar = () => {
    return (
        <div className='w-[18%]  min-h-screen border-r-2'>

            <div className='flex flex-col gap-4 pt-6 pl-[20%] TEXT-[15PX]'>
                <NavLink className='flex items-center gap-4 border border-gray-300 border-r-2 p-2 rounded-l' to='/add'>
                    <img src={assets.add_icon} alt="" className='h-5 w-5' />
                    <p className='hidden md:block'>
                        Add Item
                    </p>
                </NavLink>
                <NavLink className='flex items-center gap-4 border border-gray-300 border-r-2 p-2 rounded-l' to='/list'>
                    <img src={assets.order_icon} alt="" className='h-5 w-5' />
                    <p className='hidden md:block'>
                        List Item
                    </p>
                </NavLink>
                <NavLink className='flex items-center gap-4 border border-gray-300 border-r-2 p-2 rounded-l' to='/orders'>
                    <img src={assets.order_icon} alt="" className='h-5 w-5' />
                    <p className='hidden md:block'>
                        Orders
                    </p>
                </NavLink>
            </div>
        </div>
    )
}

export default Sidebar
