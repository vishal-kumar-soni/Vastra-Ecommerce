import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import { ShopContext } from "../Context/ShopContext.jsx";

function Login() {
    const initialCredential = { email: "", password: "" };
    const [credential, setCredential] = useState(initialCredential);

    const { setToken } = useContext(ShopContext);

    const handleChange = (e) => {
        setCredential({ ...credential, [e.target.name]: e.target.value });
    };

    const { email, password } = credential;

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(
                "https://vastra-ecommerce-backend-w9o9.onrender.com/api/user/login",
                { email, password },
            );
            if (response.data.success) {
                localStorage.setItem("token", response.data.token);
                setToken(response.data.token);

                alert("✅ " + response.data.message);
                window.location.href = "/";
            }
        } catch (error) {
            console.log("FULL ERROR:", error);
            console.log("RESPONSE:", error.response);
            console.log("DATA:", error.response?.data);

            alert(error.response?.data?.message || error.message);
        }
    };

    return (
        <div className="min-h-screen w-full flex items-center justify-center bg-[#f8fafc] relative overflow-hidden font-sans py-24 px-4">
            <div className="absolute -top-32 -left-32 w-[500px] h-[500px] bg-emerald-200/40 rounded-full blur-[120px]" />
            <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-teal-200/40 rounded-full blur-[120px]" />

            {/* The Main Container */}
            <div className="relative z-10 w-full max-w-[900px] flex bg-white rounded-[32px] overflow-hidden shadow-[0_50px_100px_-20px_rgba(0,0,0,0.3)] border border-white max-sm:py-12">
                {/* Left Side */}
                <div className="hidden sm:flex w-1/2 bg-[#2fafbd] relative p-12 flex-col justify-between overflow-hidden">
                    <div className="absolute top-[-10%] right-[-10%] w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>

                    <div className="relative z-10">
                        <h2 className="text-white text-4xl font-bold leading-tight">
                            Step into <br /> Exclusive Fashion.
                        </h2>
                        <div className="w-32 h-1.5 bg-white mt-6 rounded-full"></div>
                    </div>

                    <div className="relative z-10">
                        <p className="text-emerald-100 text-sm">
                            © 2026 VASHTRA E-COMMERCE
                        </p>
                    </div>

                    {/* Decorative Image rotated square */}
                    <div className="absolute bottom-[-20px] right-[-40px] w-64 h-80 bg-cyan-300/20 rounded-2xl rotate-12 backdrop-blur-lg border border-white/20"></div>
                </div>

                {/* Right Side: Form */}
                <div className="w-full sm:w-1/2 px-8 sm:p-11">
                    <div className="mb-8">
                        <h1 className="text-3xl text-center font-extrabold bg-gradient-to-r from-cyan-500 via-cyan-400 to-cyan-500 bg-clip-text text-transparent tracking-tight mb-2">
                            VASHTRA
                        </h1>
                        <p className="text-gray-500 font-medium">
                            Welcome back! Please login to your account.
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div className="relative group">
                            <input
                                type="email"
                                name="email"
                                value={credential.email}
                                onChange={handleChange}
                                className="peer w-full bg-gray-50 border-b-2 border-gray-100 py-4 px-2 outline-none text-gray-800 focus:border-[#059496] transition-all placeholder-transparent"
                                placeholder="Email"
                                required
                            />
                            <label className="absolute left-2 -top-3.5 text-gray-500 text-xs font-bold transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-4 peer-focus:-top-3.5 peer-focus:text-[#26b3c8] peer-focus:text-xs pointer-events-none">
                                Email Address
                            </label>
                        </div>

                        <div className="relative group">
                            <input
                                type="password"
                                name="password"
                                value={credential.password}
                                onChange={handleChange}
                                className="peer w-full bg-gray-50 border-b-2 border-gray-100 py-4 px-2 outline-none text-gray-800 focus:border-[#059496] transition-all placeholder-transparent"
                                placeholder="Password"
                                required
                            />
                            <label className="absolute left-2 -top-3.5 text-gray-500 text-xs font-bold transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-4 peer-focus:-top-3.5 peer-focus:text-[#26b3c8] peer-focus:text-xs pointer-events-none">
                                Password
                            </label>
                        </div>

                        <div className="mt-8 flex flex-col items-center gap-4">
                            <div className="flex items-center gap-3 w-full px-1">
                                <input
                                    type="checkbox"
                                    id="agree"
                                    required
                                    className="w-4 h-4 rounded border-gray-300 text-[#059669] focus:ring-[#059669] cursor-pointer"
                                />
                                <label
                                    htmlFor="agree"
                                    className="text-xs text-gray-500 cursor-pointer"
                                >
                                    I agree to the{" "}
                                    <span className="text-[#059669] font-semibold underline">
                                        Terms
                                    </span>{" "}
                                    and{" "}
                                    <span className="text-[#059669] font-semibold underline">
                                        Privacy Policy
                                    </span>
                                    .
                                </label>
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="w-full h-14 rounded-xl cursor-pointer text-white bg-[#26b3c8] mt-4 font-black uppercase tracking-widest shadow-[0_10px_20px_-5px_rgba(5,150,105,0.4)] hover:shadow-[0_15px_30px_-5px_rgba(5,150,105,0.5)] hover:-translate-y-1 transition-all duration-300"
                        >
                            Login
                        </button>
                    </form>

                    <p className="text-center text-gray-400 text-sm font-medium mt-10">
                        Don't have an account?
                        <Link
                            to="/signup"
                            className="text-[#058a96] font-black ml-2 hover:underline"
                        >
                            Sign Up
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Login;
