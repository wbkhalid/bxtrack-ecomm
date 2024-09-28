import { Link, NavLink } from 'react-router-dom'
import { assets } from '../assets/assets'
import { useContext, useState } from 'react'
import { ShopContext } from '../context/ShopContext'

const NavBar = () => {
    const [visible, setIsVisible] = useState(false)
    const { getCartCount } = useContext(ShopContext)
    return (
        <div className='flex items-center justify-between py-5 font-medium'>
            <Link to='/' >
                <p className=''>BXTrack Ecomm</p>
            </Link>

            <ul className='hidden sm:flex gap-5 text-sm text-gray-700'>
                <NavLink to='/' className='flex flex-col items-center gap-1' >
                    <p>Home</p>
                    <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden' />
                </NavLink>
                <NavLink to='/products' className='flex flex-col items-center gap-1' >
                    <p>Products</p>
                    <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden' />
                </NavLink>
                <NavLink to='/about' className='flex flex-col items-center gap-1' >
                    <p>About</p>
                    <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden' />
                </NavLink>
                <NavLink to='/contact' className='flex flex-col items-center gap-1' >
                    <p>Contact</p>
                    <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden' />
                </NavLink>
            </ul>

            <div className='flex items-center gap-3'>
                {/* <img src={assets.search_icon} className='w-5 cursor-pointer' /> */}
                <div className="group relative">
                    <Link to='/login'>
                        <img src={assets.profile_icon} alt="" className="w-5 cursor-pointer" />
                    </Link>
                    <div className='group-hover:block hidden absolute dropdown-menu right-0 pt-4'>
                        <div className="flex flex-col gap-2 w-36 py-3 px-5 bg-slate-100 text-gray-500 rounded" >
                            <p className='cursor-pointer hover:text-base'>My Profile</p>
                            <p className='cursor-pointer hover:text-base'>Orders</p>
                            <p className='cursor-pointer hover:text-base'>Logout</p>
                        </div>
                    </div>
                </div>

                <Link to='/cart' className="relative">
                    <img src={assets.cart_icon} className='w-5' />
                    <p className='absolute right-[-8px] bottom-[-8px] w-4 h-4 flex items-center justify-center text-xs rounded-full bg-black text-white'>{getCartCount()}</p>
                </Link>

                <img src={assets.menu_icon} alt="" className='w-5 cursor-pointer sm:hidden' onClick={() => setIsVisible(true)} />
            </div>
            <div className={`absolute top-0 right-0 bottom-0 overflow-hidden bg-white transition-all ${visible ? 'w-full' : 'w-0'}`}>
                <div className='flex flex-col text-gray-600'>
                    <div onClick={() => setIsVisible(false)} className="flex items-center gap-4 p-3">
                        <img src={assets.dropdown_icon} className='h-4 rotate-180' alt="" />
                        <p>Back</p>
                    </div>
                    <NavLink className='py-2 pl-6 border' to='/' onClick={() => setIsVisible(false)}>Home</NavLink>
                    <NavLink className='py-2 pl-6 border' to='/products' onClick={() => setIsVisible(false)}>Products</NavLink>
                    <NavLink className='py-2 pl-6 border' to='/about' onClick={() => setIsVisible(false)}>About</NavLink>
                    <NavLink className='py-2 pl-6 border' to='/contact' onClick={() => setIsVisible(false)}>Contact</NavLink>
                </div>
            </div>
        </div>
    )
}

export default NavBar
