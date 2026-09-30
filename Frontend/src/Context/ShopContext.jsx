import axios from "axios";
import { createContext, useEffect, useState } from "react";
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

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
    const [currentPage, setCurrentPage] = useState(1);
    const [productPerPage, setProductPerPage] = useState(8);
    const [cartItems, setCartItems] = useState(getdefaultCart());
    const [token, setToken] = useState(null);

    const getNewAccessToken = async () => {

        const response = await axios.post(
            `${BACKEND_URL}/api/user/refresh-token`,
            {},
            { withCredentials: true }
        );
        if (response.data.success) {
            const newaccessToken = response.data.accessToken;

            localStorage.setItem("token", newaccessToken);

            return newaccessToken;
        } else {
            console.log("refresh token not found")
            return null;
        }
    };

    useEffect(() => {
        const getProducts = async () => {

            let savedToken = localStorage.getItem("token");

            try {
                const response = await axios.get(
                    `${BACKEND_URL}/api/product/getallproducts`,
                );

                setAllProducts(response.data.data);

            } catch (error) {
                console.log(error.message);
            }

            setToken(savedToken);

            const cartResponse = await axios.post(
                `${BACKEND_URL}/api/product/getcart`,
                {},
                {
                    headers: {
                        Authorization: `Bearer ${savedToken}`,
                    },
                }
            );
            setCartItems(cartResponse.data.cartData);
        };

        getProducts();
    }, []);


    const addToCart = async (itemId) => {
        let authToken = localStorage.getItem("token");

        if (!authToken) {
            authToken = await getNewAccessToken();

            if (!authToken) {
                alert("Login first Please");
                return;
            }
        }

        try {
            const response = await axios.post(
                `${BACKEND_URL}/api/product/addcart`,
                { itemId },
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

            if (error.response?.status === 401) {

                console.log("Access token expired. Refreshing...");

                const newAccessToken = await getNewAccessToken();

                if (!newAccessToken) {
                    alert("Please login first");
                    return;
                }

                // Retry request with new token
                try {
                    const response = await axios.post(
                        `${BACKEND_URL}/api/product/addcart`,
                        { itemId },
                        {
                            headers: {
                                Authorization: `Bearer ${newAccessToken}`,
                            },
                        }
                    );

                    if (response.data.success) {
                        setCartItems(response.data.cartData);
                    }

                } catch (retryError) {
                    console.error("Retry failed:", retryError);
                    alert("Please login again");
                }

            } else {
                console.error(error);
            }
        }
    };
    const removeFromCart = async (itemId) => {
        setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
        let authToken = localStorage.getItem("token");

        if (!authToken) {
            authToken = await getNewAccessToken();

            if (!authToken) {
                alert("Please login first");
                return;
            }
        }

        try {
            const response = await axios.post(
                `${BACKEND_URL}/api/product/removecart`,
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
        currentPage,
        setCurrentPage,
        productPerPage,
        setProductPerPage,
        cartItems,
        token,
        setToken,
        getTotalItem,
        addToCart,
        removeFromCart,
        getTotalAmount,
        getNewAccessToken
    };

    return (
        <ShopContext.Provider value={contextValue}>
            {props.children}
        </ShopContext.Provider>
    );
};

export default ShopContextProvider;
export { getdefaultCart }
