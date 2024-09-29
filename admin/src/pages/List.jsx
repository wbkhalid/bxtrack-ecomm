import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'

const List = (token) => {
  const [list, setList] = useState([])

  const fetchList = async () => {
    try {
      const response = await axios.post(`${backend_url}/api/product/list`)

      if (response.data.success) {
        setList(response.data.products)
      }

    } catch (error) {
      console.log(error);

    }
  }


  const removeProduct = async (id) => {
    try {
      const response = await axios.post(`${backend_url}/api/product/remove`, { id }, { headers, token })

      if (response.data.success) {
        toast.success(response.data.message)
        await fetchList()
      }

    } catch (error) {
      console.log(error);

    }
  }

  useEffect(() => {
    fetchList()
  }, [])
  return (
    <>
      <p className='mb-2'>All Products List</p>

      <div className='flex flex-col gap-2'>

        <div className='hidden md:grid grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center px-2 py-2 border bg-gray-100 text-sm'>
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b className='text-center'>Action</b>
        </div>

        {
          list?.map(item => (
            <div key={item._id} className='grid grid-cols-[1fr_3fr_1fr] md:grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center gap-2 px-2 text-sm border'>
              <img src={item?.image[0]} alt="" className='w-12' />
              <p>{item.name}</p>
              <p>{item.category}</p>
              <p>{item.price}</p>
              <p className='text-right md:text-center cursor-pointer text-lg' onClick={()=>removeProduct(item._id)}>X</p>
            </div>
          ))
        }
      </div>
    </>
  )
}

export default List
