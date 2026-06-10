import axios from 'axios';
import React, { createContext, useEffect, useState } from 'react'
import Cookies from "js-cookie";

export const ShopContext = createContext(null);


const getdefaultCart = () => {
    let cart = {};

    for (let i = 0; i < 200 + 1; i++) {
        cart[i] = 0;
    }
    return cart;
}


const ShopContextProvider = (props) => {
    const [allProducts, setAllProducts] = useState([])
    const [cartItems, setCartItems] = useState(getdefaultCart())
    const [token, setToken] = useState(Cookies.get("token") || null);

    useEffect(() => {

        const getProducts = async () => {

            try {
                const response = await axios.get("https://vastra-ecommerce-backend.onrender.com/api/product/getallproducts");
                setAllProducts(response.data.data);
            } catch (error) {
                console.log(error);
            }

            // Check cookie again on mount for debugging
            const savedToken = Cookies.get("token");
            if (savedToken) {
                setToken(savedToken);
            } else {
                console.log("No token found in cookies");
            }

            if (token) {

                try {

                    const cartRes = await axios.post(
                        "https://vastra-ecommerce-backend.onrender.com/api/product/getcart",
                        {}, // Empty body
                        { withCredentials: true } // CRITICAL: This sends the cookie to your middleware
                    );
                    setCartItems(cartRes.data);

                } catch (error) {
                    console.error("Error while adding to cart:", error.response?.data || error.message);
                }
            }
        };

        getProducts();
    }, []);


    const addToCart = async (itemId) => {
        try {
            const response = await axios.post(
                "https://vastra-ecommerce-backend.onrender.com/api/product/addcart",
                { itemId },
                { withCredentials: true }
            );

            if (response.data.success) {
                setCartItems((prev) => ({
                    ...prev,
                    [itemId]: (prev[itemId] || 0) + 1
                }));
            }

        } catch (error) {
            console.error(error);
            alert("Please login first");
        }
    };


    const removeFromCart = async (itemId) => {
        setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }))
        try {
            await axios.post(
                "https://vastra-ecommerce-backend.onrender.com/api/product/removecart",
                { "itemId": itemId },   // request body
                {
                    withCredentials: true
                }
            );

        } catch (error) {
            console.error("Error while adding to cart:", error.response?.data || error.message);
        }
    }


    const getTotalAmount = () => {
        let totalAmount = 0;
        for (const item in cartItems) {
            if (cartItems[item] > 0) {
                let itemInfo = allProducts.find((product) => product.id === Number(item))
                totalAmount += itemInfo.new_price * cartItems[item]
            }
        }
        return totalAmount
    }
    const getTotalItem = () => {
        let totalItem = 0;
        for (const item in cartItems) {
            if (cartItems[item] > 0) {
                totalItem += cartItems[item];
            }
        }
        return totalItem
    }

    const contextValue = {
        allProducts,
        cartItems,
        token,
        setToken,
        getTotalItem,
        addToCart,
        removeFromCart,
        getTotalAmount
    };

    return (
        <ShopContext.Provider value={contextValue}>
            {props.children}
        </ShopContext.Provider>
    )
}

export default ShopContextProvider;
