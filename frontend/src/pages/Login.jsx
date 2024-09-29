import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import axios from 'axios'

const Login = () => {

    const { navigate, backend_url, token, setToken } = useContext(ShopContext);
    const [currentState, setCurrentState] = useState('Log In');

    // State for input fields
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const onSubmitHandler = async (e) => {
        e.preventDefault()
        if (currentState == 'Sign Up') {
            const response = await axios.post(`${backend_url}/api/user/register`, { name, email, password })
            if (response.data.success) {
                setToken(response.data.token)
                localStorage.setItem('token', response.data.token)
            }
        } else {
            const response = await axios.post(`${backend_url}/api/user/login`, { email, password })
            if (response.data.success) {
                setToken(response.data.token)
                localStorage.setItem('token', response.data.token)
            }
        }
    }

    // useEffect(() => {
    //     navigate('/')
    // }, [])

    return (
        <form onSubmit={onSubmitHandler} className='flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-gray-700'>
            <p className="text-xl md:text-2xl font-bold mb-4 text-center">{currentState}</p>

            {currentState === 'Log In' ? '' : (
                <input
                    type="text"
                    className='w-full px-3 py-2 border border-gray-700'
                    placeholder='Name'
                    value={name}
                    onChange={(e) => setName(e.target.value)} // onChange handler for name input
                    required
                />
            )}

            <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)} // onChange handler for email input
                className='w-full px-3 py-2 border border-gray-700'
                placeholder='Email'
                required
            />
            <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)} // onChange handler for password input
                className='w-full px-3 py-2 border border-gray-700'
                placeholder='Password'
                required
            />

            <div className='flex gap-1'>
                <p className='text-sm'>
                    {currentState === 'Log In' ? "If you do not have an account" : "Already have an account"}
                </p>
                <p
                    className='text-sm cursor-pointer text-blue-500 font-bold'
                    onClick={() => setCurrentState(currentState === 'Log In' ? 'Sign Up' : 'Log In')}
                >
                    {currentState === 'Log In' ? "Create Account" : "Log in"}
                </p>
            </div>

            <button className='bg-black text-white text-sm my-8 py-3 px-8 active:bg-gray-700'>
                {currentState === 'Log In' ? 'Log In' : 'Sign Up'}
            </button>
        </form>
    );
};

export default Login;
