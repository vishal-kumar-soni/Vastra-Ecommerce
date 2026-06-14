import axios from "axios";
import React, { createContext, useEffect, useState } from "react";

export const ShopContext = createContext(null);

const getdefaultCart = () => {
    let cart = {};

    for (let i = 0; i < 50 + 1; i++) {
        cart[i] = 0;
    }
    return cart;
};


const ShopContextProvider = (props) => {
    const [allProducts, setAllProducts] = useState([]);
    const [cartItems, setCartItems] = useState(getdefaultCart());
    const [token, setToken] = useState(null);

    useEffect(() => {
        const getProducts = async () => {

            const savedToken = localStorage.getItem("token");
            console.log("This is saved token", savedToken)

            try {
                const response = await axios.get(
                    "http://localhost:4000/api/product/getallproducts",
                );

                setAllProducts(response.data.data);

                console.log("all product in context---", response.data.data)
            } catch (error) {
                console.log("getallproducts-----", error);
            }


            if (savedToken) {
                setToken(savedToken);

                const cartResponse = await axios.post(
                    "http://localhost:4000/api/product/getcart",
                    {},
                    {
                        headers: {
                            Authorization: `Bearer ${savedToken}`,
                        },
                    }
                );

                console.log("TYPE:", typeof cartResponse.data.cartData);
                console.log(cartResponse.data.cartData);

                setCartItems(cartResponse.data.cartData);

            } else {
                console.log("No token found in localStorage");
            }
        };

        getProducts();
    }, []);

    useEffect(() => {
        console.log("UPDATED CART STATE", cartItems);
    }, [cartItems]);

    useEffect(() => {
        console.log("Products Loaded:", allProducts.length);
        console.log("Cart Loaded:", cartItems);
    }, [allProducts, cartItems]);


    const addToCart = async (itemId) => {
        const authToken = localStorage.getItem("token");
        console.log(authToken, "------auto token in add to cart context----and Item id is ", itemId)

        try {
            const response = await axios.post(
                "http://localhost:4000/api/product/addcart",
                { itemId },
                {
                    headers: {
                        Authorization: `Bearer ${authToken}`,
                    },
                },
            );

            console.log("This is the add to cart Response---", response)

            if (response.data.success) {
                setCartItems(response.data.cartData);
            }
        } catch (error) {
            console.error(error);
            alert("Please login first");

        }
    };

    const removeFromCart = async (itemId) => {
        setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
        const authToken = localStorage.getItem("token");
        try {
            const response = await axios.post(
                "http://localhost:4000/api/product/removecart",
                { itemId: itemId }, // request body
                {
                    headers: {
                        Authorization: `Bearer ${authToken}`,
                    },
                }
            );
            if (response.data.success) {
                setCartItems(response.data.cartData);
            }
        } catch (error) {
            console.error(
                "Error while adding to cart:",
                error.response?.data || error.message,
            );
        }
    };

    const getTotalAmount = () => {
        let totalAmount = 0;
        for (const item in cartItems) {
            if (cartItems[item] > 0) {
                let itemInfo = allProducts.find(
                    (product) => product.id === Number(item),
                );
                totalAmount += 10 * cartItems[item];
                // totalAmount += itemInfo.new_price * cartItems[item];
            }
        }
        return totalAmount;
    };
    const getTotalItem = () => {
        let totalItem = 0;
        for (const item in cartItems) {
            if (cartItems[item] > 0) {
                totalItem += cartItems[item];
            }
        }
        return totalItem;
    };

    const contextValue = {
        allProducts,
        cartItems,
        token,
        setToken,
        getTotalItem,
        addToCart,
        removeFromCart,
        getTotalAmount,
    };

    return (
        <ShopContext.Provider value={contextValue}>
            {props.children}
        </ShopContext.Provider>
    );
};

export default ShopContextProvider;
export { getdefaultCart }
