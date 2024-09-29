import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = ({ setToken }) => {
    return (
        <div className='flex items-center py-2 px-[4%] justify-between'>
            <Link to='/' >
                <p className=''>BXTrack Admin</p>
            </Link>
            <button className='bg-gray-600 text-white px-5 py-2  rounded-full' onClick={() => setToken('')}>Logout</button>
        </div>
    )
}

export default Navbar
