import React, { useState } from 'react'

const Login = () => {
    const [currentState, setCurrentState] = useState('Log In')
    return (
        <div className='flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-gray-700'>
            <p className="text-xl md:text-2xl font-bold mb-4 text-center">{currentState}</p>

            {
                currentState == 'Log In' ? '' : <input type="text" className='w-full px-3 py-2 border border-gray-700' placeholder='Name' required />
            }

            <input type="email" className='w-full px-3 py-2 border border-gray-700' placeholder='Email' required />
            <input type="password" className='w-full px-3 py-2 border border-gray-700' placeholder='Password' required />

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
            <button className='bg-black text-white text-sm my-8 py-3 px-8 active:bg-gray-700'>{
                currentState === 'Log In' ? 'Log In' : 'Sign Up'
            }</button>



        </div>
    )
}

export default Login
