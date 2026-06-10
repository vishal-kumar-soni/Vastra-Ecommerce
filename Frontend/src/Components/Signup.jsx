
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function Signup() {
    const initialCredential = {
        email: "",
        userName: "",
        password: ""
    };

    const [credential, setCredential] = useState(initialCredential);

    const handleChange = (e) => {
        setCredential({ ...credential, [e.target.name]: e.target.value });
    };

    const { email, userName, password } = credential;

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(
                "https://vastra-ecommerce-backend-w9o9.onrender.com/api/user/signup",
                { userName, email, password },
            );

            if (response.data.success) {
                alert(' ✅ ' + "You are successfully registered");
                window.location.href = "/";
            }
        } catch (error) {
            const message = error.response?.data?.message || "Something went wrong";
            alert(message);
            console.log(error);
        }
    };

    return (
        <div className='min-h-screen w-full flex items-center justify-center bg-[#f8fafc] relative overflow-hidden font-sans px-4 py-24'>

            {/* Soft Background Accents */}
            <div className="absolute -top-32 -left-32 w-[500px] h-[500px] bg-emerald-200/40 rounded-full blur-[120px]" />
            <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-teal-200/40 rounded-full blur-[120px]" />

            {/* Main Container */}
            <div className='relative z-10 w-full max-w-[950px] flex bg-white rounded-[32px] overflow-hidden shadow-[0_50px_100px_-20px_rgba(0,0,0,0.08)] border border-white'>

                {/* Left Side: Branding / Visual */}
                <div className='hidden sm:flex w-[40%] bg-[#2fafbd] relative p-12 flex-col justify-between overflow-hidden max-md:p-8'>
                    <div className="absolute top-[-10%] left-[-10%] w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>

                    <div className='relative z-10'>
                        <h2 className='text-white text-4xl font-black leading-tight'>
                            Join the <br /> Vashtra <br /> Community
                        </h2>
                        <p className='text-emerald-100 mt-6 font-medium'>Experience fashion that redefines your everyday style.</p>
                        <div className='w-32 h-1.5 bg-white mt-8 rounded-full'></div>
                    </div>

                    <div className='relative z-10'>
                        <p className='text-emerald-100 text-xs tracking-widest uppercase font-bold'>Premium Quality Guaranteed</p>
                    </div>

                    {/* Aesthetic Floating Element */}
                    <div className='absolute bottom-[-7%] right-[-20%] w-72 h-72 bg-white/10 rounded-full border border-white/20 backdrop-blur-sm'></div>
                </div>

                {/* Right Side: Signup Form */}
                <div className='w-full sm:w-[60%] p-8 sm:p-8'>
                    <div className="mb-8">
                        <h1 className='text-3xl text-center font-extrabold bg-gradient-to-r from-cyan-500 via-cyan-400 to-cyan-500 bg-clip-text text-transparent tracking-tight mb-2'>
                            VASHTRA
                        </h1>
                        <p className='text-gray-500 mt-2 font-medium'>Sign up to start your fashion journey with Vashtra.</p>
                    </div>

                    <form onSubmit={handleSubmit} className='space-y-5'>
                        {/* User Name Field */}
                        <div className='relative group'>
                            <input
                                type="text"
                                name="userName"
                                value={userName}
                                onChange={handleChange}
                                className='peer w-full bg-gray-50 border-b-2 border-gray-100 py-3 px-2 outline-none text-gray-800 focus:border-[#059496] transition-all placeholder-transparent'
                                placeholder='Your Name'
                                required
                            />
                            <label className='absolute left-2 -top-3.5 text-gray-500 text-xs font-bold transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-3 peer-focus:-top-3.5 peer-focus:text-[#059496] peer-focus:text-xs pointer-events-none'>
                                Full Name
                            </label>
                        </div>

                        {/* Email Field */}
                        <div className='relative group'>
                            <input
                                type="email"
                                name='email'
                                value={email}
                                onChange={handleChange}
                                className='peer w-full bg-gray-50 border-b-2 border-gray-100 py-3 px-2 outline-none text-gray-800 focus:border-[#059496] transition-all placeholder-transparent'
                                placeholder='Email'
                                required
                            />
                            <label className='absolute left-2 -top-3.5 text-gray-500 text-xs font-bold transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-3 peer-focus:-top-3.5 peer-focus:text-[#059496] peer-focus:text-xs pointer-events-none'>
                                Email Address
                            </label>
                        </div>

                        {/* Password Field */}
                        <div className='relative group'>
                            <input
                                type="password"
                                name='password'
                                value={password}
                                onChange={handleChange}
                                className='peer w-full bg-gray-50 border-b-2 border-gray-100 py-3 px-2 outline-none text-gray-800 focus:border-[#059496] transition-all placeholder-transparent'
                                placeholder='Password'
                                required
                            />
                            <label className='absolute left-2 -top-3.5 text-gray-500 text-xs font-bold transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-3 peer-focus:-top-3.5 peer-focus:text-[#059496] peer-focus:text-xs pointer-events-none'>
                                Password
                            </label>
                        </div>

                        {/* Terms Checkbox */}
                        <div className='flex items-start gap-3 pt-1'>
                            <input
                                type="checkbox"
                                id="agree"
                                required
                                className='mt-1 accent-[#059669] w-4 h-4 cursor-pointer'
                            />
                            <label htmlFor="agree" className='text-xs text-gray-500 leading-tight cursor-pointer'>
                                By continuing, I agree to the <span className='text-[#059669] font-bold underline'>Terms of Use</span> and <span className='text-[#059669] font-bold underline'>Privacy Policy</span>.
                            </label>
                        </div>

                        <button
                            type='submit'
                            className='w-full h-13 rounded-xl text-white bg-[#26b3c8] cursor-pointer mt-3 font-black uppercase tracking-widest shadow-[0_10px_20px_-5px_rgba(5,150,105,0.4)] hover:shadow-[0_15px_30px_-5px_rgba(5,150,105,0.5)] hover:-translate-y-1 transition-all duration-300'
                        >
                            Create Account
                        </button>
                    </form>

                    <p className='text-center text-gray-400 text-sm font-medium mt-6'>
                        Already have an account?
                        <Link to="/login" className='text-[#059496] font-black ml-2 hover:underline'>Login here</Link>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Signup;
