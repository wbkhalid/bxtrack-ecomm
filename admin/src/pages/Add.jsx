import React, { useState } from 'react';
import { assets } from '../assets/assets';
import axios from 'axios';
import { backend_url } from '../App';
import { toast } from 'react-toastify';

const Add = ({ token }) => {
  // Image upload states (set as file objects)
  const [image1, setImage1] = useState(null);
  const [image2, setImage2] = useState(null);
  const [image3, setImage3] = useState(null);
  const [image4, setImage4] = useState(null);

  // Product fields
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('Men');
  const [subCategory, setSubCategory] = useState('Men');
  const [bestseller, setBestseller] = useState(false);
  const [sizes, setSizes] = useState([]);

  const resetForm = () => {
    setImage1(null);
    setImage2(null);
    setImage3(null);
    setImage4(null);
    setName('');
    setDescription('');
    setPrice('');
    setCategory('Men');
    setSubCategory('Men');
    setBestseller(false);
    setSizes([]);
  };


  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData()
      formData.append('name', name)
      formData.append('description', description)
      formData.append('price', price)
      formData.append('category', category)
      formData.append('subCategory', subCategory)
      formData.append('bestseller', bestseller)
      formData.append('sizes', JSON.stringify(sizes))

      image1 && formData.append('image1', image1)
      image2 && formData.append('image2', image2)
      image3 && formData.append('image3', image3)
      image4 && formData.append('image4', image4)

      const response = await axios.post(`${backend_url}/api/product/add`, formData, { headers: token })

      if (response.data.success) {
        toast.success('Product Added');
        resetForm(); // Clear form after successful submission
      }

    } catch (error) {
      console.log(error);
      toast.error('Error adding product');
    }
  };


  return (
    <form onSubmit={handleSubmit}>
      <div className='flex flex-col w-full items-start gap-2'>
        <p className='mb-2'>Upload Images</p>
        <div className='flex gap-2'>
          <label htmlFor="image-1">
            <img src={!image1 ? assets.upload_area : URL.createObjectURL(image1)} alt="Upload Area" className='w-20' />
            <input
              type="file"
              id='image-1'
              hidden
              onChange={(e) => setImage1(e.target.files[0])}
            />
          </label>
          <label htmlFor="image-2">
            <img src={!image2 ? assets.upload_area : URL.createObjectURL(image2)} alt="Upload Area" className='w-20' />
            <input
              type="file"
              id='image-2'
              hidden
              onChange={(e) => setImage2(e.target.files[0])}
            />
          </label>
          <label htmlFor="image-3">
            <img src={!image3 ? assets.upload_area : URL.createObjectURL(image3)} alt="Upload Area" className='w-20' />
            <input
              type="file"
              id='image-3'
              hidden
              onChange={(e) => setImage3(e.target.files[0])}
            />
          </label>
          <label htmlFor="image-4">
            <img src={!image4 ? assets.upload_area : URL.createObjectURL(image4)} alt="Upload Area" className='w-20' />
            <input
              type="file"
              id='image-4'
              hidden
              onChange={(e) => setImage4(e.target.files[0])}
            />
          </label>
        </div>

        <div className='w-full'>
          <p className='mb-2'>Product Name</p>
          <input
            className='w-full max-w-[500px] px-3 py-2'
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div className='w-full'>
          <p className='mb-2'>Product Description</p>
          <textarea
            className='w-full max-w-[500px] px-3 py-2'
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>

        <div className='flex flex-col md:flex-row gap-2 md:gap-4'>
          <div>
            <p className='mb-2'>Product Category</p>
            <select
              name="category"
              className='w-full p-2'
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="Men">Men</option>
              <option value="Women">Women</option>
              <option value="Kids">Kids</option>
            </select>
          </div>

          <div>
            <p className='mb-2'>Product Subcategory</p>
            <select
              name="subcategory"
              className='w-full p-2'
              value={subCategory}
              onChange={(e) => setSubCategory(e.target.value)}
            >
              <option value="Men">Men</option>
              <option value="Women">Women</option>
              <option value="Kids">Kids</option>
            </select>
          </div>

          <div>
            <p className='mb-2'>Product Price</p>
            <input
              className='w-full px-2 py-2 sm:w-[120px]'
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
            />
          </div>
        </div>

        <div>
          <p className='mb-2'>Product Sizes</p>
          <div className='flex gap-2'>
            <div onClick={() => setSizes(prev => prev.includes('S') ? prev.filter(item => item != 'S') : [...prev, 'S'])}>
              <p className='bg-slate-200 px-3 py-1 cursor-pointer'>S</p>
            </div>
            <div onClick={() => setSizes(prev => prev.includes('M') ? prev.filter(item => item != 'M') : [...prev, 'M'])}>
              <p className='bg-slate-200 px-3 py-1 cursor-pointer'>M</p>
            </div>
            <div onClick={() => setSizes(prev => prev.includes('L') ? prev.filter(item => item != 'L') : [...prev, "L"])}>
              <p className='bg-slate-200 px-3 py-1 cursor-pointer'>L</p>
            </div>
            <div onClick={() => setSizes(prev => prev.includes('XL') ? prev.filter(item => item != 'XL') : [...prev, "XL"])}>
              <p className='bg-slate-200 px-3 py-1 cursor-pointer'>XL</p>
            </div>
            <div onClick={() => setSizes(prev => prev.includes('XXL') ? prev.filter(item => item != 'XXL') : [...prev, 'XXL'])}>
              <p className='bg-slate-200 px-3 py-1 cursor-pointer'>XXL</p>
            </div>

          </div>
        </div>



        <div className='flex gap-4 mt-2'>
          <label htmlFor='bestseller' className='cursor-pointer'>
            <input
              type="checkbox"
              id='bestseller'
              checked={bestseller}
              onChange={() => setBestseller(!bestseller)}
            />
            Add to best seller
          </label>
        </div>

        <button type='submit' className='bg-black text-white w-28 mt-2 py-3'>
          ADD
        </button>
      </div>
    </form>
  );
};

export default Add;
