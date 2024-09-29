import React, { useEffect, useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Add from './pages/Add';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Orders from './pages/Orders';
import List from './pages/List';
import Login from './components/Login';

export const backend_url = import.meta.env.VITE_BACKEND_URL

const App = () => {
  const [token, setToken] = useState()

  useEffect(() => {
    localStorage.setItem('token', token)
  }, [token])

  return (
    <>
      <div className='bg-gray-50 min-h-screen'>
        <ToastContainer />
        {
          token === '' ? (<Login setToken={setToken} />) : (
            <>
              <Navbar setToken={setToken} />
              <hr />
              <div className='flex w-full'>
                <Sidebar />
                <div className='w-[70%] mx-auto ml-[max(5vw,25px)] my-8 text-gray-600 text-base'>

                  <Routes>
                    <Route path='/add' element={<Add token={token} />} />
                    <Route path='/list' element={<List token={token} />} />
                    <Route path='/orders' element={<Orders token={token} />} />
                  </Routes>
                </div>
              </div>
            </>)
        }

      </div>
    </>
  )
}

export default App
