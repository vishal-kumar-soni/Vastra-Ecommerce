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

        const newaccessToken = response.data.accessToken;

        localStorage.setItem("token", newaccessToken);

        return newaccessToken;
    };

    useEffect(() => {
        const getProducts = async () => {

            const savedToken = localStorage.getItem("token");

            try {
                const response = await axios.get(
                    `${BACKEND_URL}/api/product/getallproducts`,
                );

                setAllProducts(response.data.data);

            } catch (error) {
                console.log(error.message);
            }


            // If access token doesn't exist, get a new one using refresh token
            if (!savedToken) {
                savedToken = await getNewAccessToken();
            }

            // If we still don't have a token, user is not logged in
            if (!savedToken) {
                console.log("No valid token found");
                return;
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
        const authToken = localStorage.getItem("token");

        if (!authToken) {
            authToken = await getNewAccessToken();

            if (!authToken) {
                alert("Please login first");
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
                },
            );

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
