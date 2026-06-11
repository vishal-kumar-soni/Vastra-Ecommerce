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
                    "https://vastra-ecommerce-backend-w9o9.onrender.com/api/product/getallproducts",
                );
                setAllProducts(response.data.data);
            } catch (error) {
                console.log(error);
            }


            if (savedToken) {
                setToken(savedToken);

                const cartResponse = await axios.post(
                    "https://vastra-ecommerce-backend-w9o9.onrender.com/api/product/getcart",
                    {},
                    {
                        headers: {
                            Authorization: `Bearer ${savedToken}`,
                        },
                    }
                );

                console.log("This is rhe cart Response---", cartResponse)

                console.log("succ", cartResponse.data)
                setCartItems(cartResponse.data);

                console.log("This is the cart item---", cartItems)
            } else {
                console.log("No token found in localStoragefdhgfrnhn");
            }
        };

        getProducts();
    }, []);

    const addToCart = async (itemId) => {
        const authToken = localStorage.getItem("token");
        console.log(authToken, "------auto token in add to cart context----and Item id is ", itemId)

        try {
            const response = await axios.post(
                "https://vastra-ecommerce-backend-w9o9.onrender.com/api/product/addcart",
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
                "https://vastra-ecommerce-backend-w9o9.onrender.com/api/product/removecart",
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
                totalAmount += itemInfo.new_price * cartItems[item];
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
