import React, { useContext } from 'react';
import { ShopContext } from '../Context/ShopContext';
import removeIcon from "../Components/Assets/cart_cross_icon.png";

function CartItem() {
    const { allProducts, cartItems, getTotalAmount, removeFromCart } = useContext(ShopContext);

    return (
        <div className='min-h-screen bg-[#f8fafc] pt-28 pb-20 px-4 md:px-10'>
            <div className='max-w-[1200px] mx-auto'>

                {/* Header Section */}
                <div className='mb-10'>
                    <h1 className='text-4xl font-black text-gray-900 tracking-tight'>Shopping <span className='text-cyan-600'>Bag</span></h1>
                    <p className='text-gray-500 font-medium mt-2'>Review your selected items before checkout.</p>
                </div>

                <div className='flex flex-col lg:flex-row gap-10'>

                    {/* Left Side: Product List */}
                    <div className='w-full lg:w-[65%] space-y-4'>
                        <div className='hidden sm:grid grid-cols-6 px-6 py-4 bg-white rounded-2xl shadow-sm border border-gray-100 text-xs font-black uppercase tracking-widest text-gray-400'>
                            <p className='col-span-2'>Product</p>
                            <p className='text-center'>Price</p>
                            <p className='text-center'>Quantity</p>
                            <p className='text-center'>Total</p>
                            <p className='text-right'>Action</p>
                        </div>

                        {allProducts.map((item) => {
                            if (cartItems[item.id] > 0) {
                                return (
                                    <div key={item.id} className='group bg-white rounded-3xl p-5 mb-4 shadow-[0_4px_20px_-5px_rgba(0,0,0,0.05)] border border-white hover:border-[#059669]/30 transition-all duration-300'>

                                        <div className='flex flex-col sm:grid sm:grid-cols-6 items-center gap-4'>

                                            {/* 1. Product Image & Info */}
                                            <div className='w-full sm:col-span-2 flex items-center gap-4'>

                                                <div className='w-20 h-24 bg-gray-50 rounded-2xl overflow-hidden flex-shrink-0 border border-gray-100'>
                                                    <img src={item.image} alt={item.name} className='w-full h-full object-cover group-hover:scale-110 transition-transform duration-500' />
                                                </div>
                                                <div className='flex-1'>
                                                    <p className='font-bold text-gray-900 text-sm sm:text-base leading-tight'>{item.name}</p>

                                                </div>

                                                {/*  Remove Button  */}
                                                <button
                                                    onClick={() => removeFromCart(item.id)}
                                                    className='sm:hidden p-2 bg-red-50 text-red-500 rounded-xl'
                                                >
                                                    <img src={removeIcon} className='w-3 h-3' alt="Remove" />
                                                </button>
                                            </div>

                                            <div className='w-full  sm:contents flex items-center justify-between pt-4 px-3 border-t border-gray-50 sm:border-0 sm:mt-0 sm:pt-0'>

                                                {/* Price*/}
                                                <p className='hidden sm:block text-center font-bold text-gray-600'>${item.new_price}</p>

                                                {/* Quantity Selector */}
                                                <div className='flex items-center gap-2 sm:justify-center'>
                                                    <span className='sm:hidden text-[10px] font-bold text-gray-400 uppercase'>Qty:</span>
                                                    <div className='flex items-center justify-center w-10 h-8 sm:w-12 sm:h-10 bg-gray-50 rounded-xl border border-gray-200 font-black text-gray-700 text-sm'>
                                                        {cartItems[item.id]}
                                                    </div>
                                                </div>

                                                {/* Total */}
                                                <div className='text-right sm:text-center'>
                                                    <span className='sm:hidden block text-[10px] font-bold text-[#059496] uppercase'>Total</span>
                                                    <p className='font-black text-[#059496] text-base sm:text-lg'>
                                                        ${item.new_price * cartItems[item.id]}
                                                    </p>
                                                </div>

                                                <div className='hidden sm:flex justify-end'>
                                                    <button
                                                        onClick={() => removeFromCart(item.id)}
                                                        className='p-3 bg-red-50 hover:bg-red-100 rounded-2xl transition-colors group/btn'
                                                    >
                                                        <img src={removeIcon} className='w-4 h-4 opacity-60 group-hover/btn:opacity-100 transition-opacity' alt="Remove" />
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                );
                            }
                            return null;
                        })}
                    </div>

                    {/* Right Side: Summary & Checkout */}
                    <div className='w-full lg:w-[35%] space-y-6'>
                        <div className='bg-white rounded-[32px] p-8 shadow-[0_20px_50px_-10px_rgba(0,0,0,0.08)] border border-white'>
                            <h2 className='text-2xl font-black text-gray-900 mb-6 uppercase tracking-tight'>Order Summary</h2>

                            <div className='space-y-4'>
                                <div className='flex justify-between text-gray-500 font-medium'>
                                    <p>Subtotal</p>
                                    <p className='text-gray-900'>${getTotalAmount()}</p>
                                </div>
                                <div className='flex justify-between text-gray-500 font-medium'>
                                    <p>Shipping Fee</p>
                                    <p className='text-[#059496] font-bold'>FREE</p>
                                </div>
                                <div className='h-[1px] bg-gray-100 my-4'></div>
                                <div className='flex justify-between items-center'>
                                    <p className='text-lg font-black text-gray-900 uppercase'>Total</p>
                                    <p className='text-2xl font-black text-[#059496]'>${getTotalAmount()}</p>
                                </div>
                            </div>

                            <button className='w-full h-16 bg-[#11a3a5] text-white rounded-2xl mt-8 font-black uppercase tracking-widest shadow-[0_10px_25px_-5px_rgba(5,150,105,0.4)] hover:shadow-[0_15px_35px_-5px_rgba(5,150,105,0.5)] hover:-translate-y-1 transition-all duration-300'>
                                Proceed To Checkout
                            </button>
                        </div>

                        {/* Promo Code Card */}
                        <div className='bg-white rounded-3xl p-6 shadow-sm border border-gray-100'>
                            <p className='text-sm font-bold text-gray-400 uppercase tracking-widest mb-4'>Have a promo code?</p>
                            <div className='flex gap-2'>
                                <input
                                    type="text"
                                    placeholder='Code'
                                    className='flex-1 bg-gray-50 border w-[60%] border-gray-100 rounded-xl px-4 outline-none focus:border-[#059669] transition-all'
                                />
                                <button className='bg-gray-900 text-white px-6 py-3 rounded-xl font-bold hover:bg-black transition-colors'>
                                    Apply
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CartItem;
