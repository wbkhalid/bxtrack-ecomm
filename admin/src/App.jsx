import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Add from './pages/Add';

const App = () => {
  return (
    <>
      <div className='px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]'>
        <ToastContainer />
        <NavBar />
        <Routes>
          <Route path='/add' element={<Add />} />
        </Routes>
      </div>
      <Footer />
    </>
  )
}

export default App
