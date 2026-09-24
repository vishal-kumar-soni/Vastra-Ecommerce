import React, { useContext } from "react";
import { ShopContext } from "../Context/ShopContext";
import Item from "./Item";


const AllProducts = () => {
    const { allProducts } = useContext(ShopContext);

    if (!allProducts || allProducts.length==0) {
        return (
            <div className=" flex flex-col items-center justify-center min-h-screen gap-4">
                <div className="w-16 h-16 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin"></div>
                <p className="text-gray-400 text-sm">Loading....</p>
            </div>
        )
    }
    return (
    <>
        <section
            className="relative min-h-screen bg-gradient-to-br from-emerald-50 via-white to-emerald-100 py-20 px-6"
        >
            {/* Decorative Blur */}
            <div className="absolute -top-32 -left-32 w-[420px] h-[420px] bg-emerald-300/30 blur-[140px]" />
            <div className="absolute -bottom-32 -right-32 w-[420px] h-[420px] bg-emerald-400/20 blur-[140px]" />

            {/* Heading */}
            <div className="relative text-center mb-16 mt-5">
                <h1 className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-cyan-600 via-cyan-400 to-cyan bg-clip-text text-transparent ">
                    Explore All Products
                </h1>
            </div>

            {/* Product Grid */}
            <div className="relative max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">
                {allProducts.map((item) => (
                    <div key={item.id} className="group">
                        <div
                            className=" flex justify-center rounded-3xl overflow-hidden  shadow-xl transition-all duration-500 group-hover:-translate-y-3 group-hover:shadow-[0_20px_50px_rgba(0,0,0,0.15)] pt-4 group-hover:bg-gradient-to-t  group-hover:from-black/7 group-hover:to-transparent max-xl:px-0 ">
                            <Item {...item} />

                            {/* glow */}
                            <div className="flex inset-0 opacity-0 group-hover:opacity-100 transition bg-gradient-to-t from-black/10 to-transparent" />
                        </div>
                    </div>
                ))}
            </div>
        </section>
    </>
    );
};

export default AllProducts;
