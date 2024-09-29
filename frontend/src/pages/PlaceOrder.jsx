import React, { useContext, useState } from 'react';
import CartTotal from '../components/CartTotal';
import { ShopContext } from '../context/ShopContext';
import axios from 'axios';
import { toast } from 'react-toastify';

const PlaceOrder = () => {


    const [method, setMethod] = useState('cod');
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: '',
        email: '',
        street: '',
        city: '',
        state: '',
        zipcode: '',
        country: '',
        phone: ''
    });

    const { currency, deliveryFee, products, addToCart, cartItems, getCartCount, updateQuantity, getCartAmount, navigate, backend_url, token, setToken, setCartItems } = useContext(ShopContext);

    const onChangeHandler = (e) => {
        const { name, value } = e.target;
        setFormData(data => ({ ...data, [name]: value }));
    };

    const onSubmitHandler = async (e) => {
        e.preventDefault();
        try {
            let orderItems = []
            for (const items in cartItems) {
                for (const item in cartItems[items]) {
                    if (cartItems[items][item] > 0) {
                        const itemInfo = structuredClone(products.find(product => product._id == items))
                        if (itemInfo) {
                            itemInfo.size = item
                            itemInfo.quantit = cartItems[items][item]
                            orderItems.push(itemInfo)
                        }
                    }
                }
                let orderData = {
                    address: formData,
                    items: orderItems,
                    amount: getCartAmount() + deliveryFee
                }

                switch (method) {
                    case 'cod':
                        const response = await axios.post(`${backend_url}/api/orders/place`, { orderData }, { headers: { token } })

                        if (response.data.success) {
                            setCartItems({})
                            navigate('/orders')

                        } else {
                            toast.error(error.message)
                        }
                        break;

                    default:
                        break;
                }
            }
        } catch (error) {


        }
    };



    return (
        <form onSubmit={onSubmitHandler} className='flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-10 min-h-[80] border-t'>
            <div className='flex flex-col gap-4 w-full sm:max-w-[480px]'>

                <p className="text-xl md:text-2xl font-bold mb-4 text-center">Delivery Info</p>

                <div className='flex gap-3 mt-3'>
                    <div className='w-full'>
                        <input
                            type="text"
                            name="firstName"
                            value={formData.firstName}
                            onChange={onChangeHandler}
                            className='border border-gray-300 rounded py-1.5 px-3 w-full'
                            placeholder='First Name'
                            required
                        />
                    </div>
                    <div className='w-full'>
                        <input
                            type="text"
                            name="lastName"
                            value={formData.lastName}
                            onChange={onChangeHandler}
                            className='border border-gray-300 rounded py-1.5 px-3 w-full'
                            placeholder='Last Name'
                            required
                        />
                    </div>
                </div>

                <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={onChangeHandler}
                    className='border border-gray-300 rounded py-1.5 px-3 w-full'
                    placeholder='Email Address'
                    required
                />

                <input
                    type="text"
                    name="street"
                    value={formData.street}
                    onChange={onChangeHandler}
                    className='border border-gray-300 rounded py-1.5 px-3 w-full'
                    placeholder='Address'
                    required
                />

                <div className='flex gap-3 mt-1'>
                    <div className='w-full'>
                        <input
                            type="text"
                            name="city"
                            value={formData.city}
                            onChange={onChangeHandler}
                            className='border border-gray-300 rounded py-1.5 px-3 w-full'
                            placeholder='City'
                            required
                        />
                    </div>
                    <div className='w-full'>
                        <input
                            type="text"
                            name="state"
                            value={formData.state}
                            onChange={onChangeHandler}
                            className='border border-gray-300 rounded py-1.5 px-3 w-full'
                            placeholder='State'
                            required
                        />
                    </div>
                </div>

                <div className='flex gap-3 mt-1'>
                    <div className='w-full'>
                        <input
                            type="number"
                            name="zipcode"
                            value={formData.zipcode}
                            onChange={onChangeHandler}
                            className='border border-gray-300 rounded py-1.5 px-3 w-full'
                            placeholder='Zip code'
                            required
                        />
                    </div>
                    <div className='w-full'>
                        <input
                            type="text"
                            name="country"
                            value={formData.country}
                            onChange={onChangeHandler}
                            className='border border-gray-300 rounded py-1.5 px-3 w-full'
                            placeholder='Country'
                            required
                        />
                    </div>
                </div>

                <input
                    type="number"
                    name="phone"
                    value={formData.phone}
                    onChange={onChangeHandler}
                    className='border border-gray-300 rounded py-1.5 px-3 w-full'
                    placeholder='Phone Number'
                    required
                />
            </div>

            <div className='mt-8'>
                <div className='mt-8 min-w-80'>
                    <CartTotal />
                </div>
                <div className='w-full text-end'>
                    <button
                        type='submit'
                        className='bg-black text-white text-sm my-8 py-3 px-8 active:bg-gray-700'
                    >
                        Place order
                    </button>
                </div>
            </div>
        </form>
    );
};

export default PlaceOrder;
