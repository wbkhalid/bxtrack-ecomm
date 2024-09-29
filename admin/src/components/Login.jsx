import React, { useState } from 'react'
import { backend_url } from '../App'
import { toast } from 'react-toastify'
import axios from 'axios'

const Login = ({ setToken }) => {

    const [email, setEmail] = useState()
    const [password, setPassword] = useState()

    const submitHandler = async (e) => {
        try {
            e.preventDefault()
            const response = axios.post(`${backend_url}/api/user/admin`, { email, password })
            if (response.data.success) {
                setToken(response.data.token)
            } else {
                toast.error(response.data.message)
            }
        } catch (error) {
            console.log(error);

        }
    }


    return (
        <div className='min-h-screen flex items-center justify-center w-full'>
            <div className='bg-white shodow-md rounded-lg px-8 py-6 max-w-md'>
                <h1 className='text-2xl font-bold mb-4'>Admin Panel</h1>
                <form onSubmit={submitHandler}>
                    <div className='mb-3 min-w-72'>
                        <p className='text-sm font-medium text-gray-700 mb-2'>Email Address</p>
                        <input type="email" onChange={(e) => setEmail(e.target.value)} value={email} placeholder='Email' required className='rounded-md w-full px-3 py-2 border border-gray-300' />
                    </div>
                    <div className='mb-3 min-w-72'>
                        <p className='text-sm font-medium text-gray-700 mb-2'>Password</p>
                        <input type="password" onChange={(e) => setPassword(e.target.value)} value={password} placeholder='Password' required className='rounded-md w-full px-3 py-2 border border-gray-300' />
                    </div>
                    <button type='submit' className='mt-2 w-full py-2 px-4 rounded-md bg-black text-white'>Login</button>
                </form>
            </div>
        </div>
    )
}

export default Login
