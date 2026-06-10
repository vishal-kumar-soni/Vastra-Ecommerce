import React, { useState } from "react";
import upload from "../components/Assets/upload-image.png";
import axios from "axios";

function AddProducts() {

    const initialProductState = {
        id: 0,
        name: "",
        image: "",
        category: "men",
        old_price: "",
        new_price: "",
    };

    const [image, setImage] = useState(false);
    const [productDetails, setproductDetails] = useState(initialProductState);

    const onChangeHandler = (e) => {
        setproductDetails({
            ...productDetails,
            [e.target.name]: e.target.value
        });
    };

    const handleUpload = (e) => {
        setImage(e.target.files[0]);
    };

    const handleAddProduct = async () => {

        try {

            if (!image) {
                alert("Please select an image");
                return;
            }

            // Upload image
            const formData = new FormData();
            formData.append("image", image);

            const response = await axios.post(
                "https://vastra-ecommerce-backend-w9o9.onrender.com/api/file/upload",
                formData
            );

            const responseData = response.data;

            if (!responseData.success) {
                alert("Image upload failed");
                return;
            }

            // Create product
            const product = {
                ...productDetails,
                image: responseData.image_url
            };

            const { data } = await axios.post(
                "https://vastra-ecommerce-backend-w9o9.onrender.com/api/product/addproducts",
                product,
                {
                    headers: {
                        "Content-Type": "application/json"
                    }
                }
            );

            if (data.success) {

                alert("✅ Product Added Successfully");

                // Reset form - all fields will be empty
                setproductDetails(initialProductState);
                setImage(false);

            } else {
                alert("Failed to add product");
            }

        } catch (error) {
            console.error("Upload failed:", error);
        }
    };

    return (
        <div id="addProduct" className="py-8 px-10 m-7 max-md:m-0 bg-white w-full ">

            <div className="w-full mb-8">
                <p className="text-[18px] mb-3 font-semibold text-gray-500">
                    Product Title
                </p>

                <input
                    type="text"
                    name="name"
                    value={productDetails.name}
                    onChange={onChangeHandler}
                    placeholder="Type title"
                    className="text-gray-500 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-200 focus:border-gray-400 transition duration-200 w-full p-2"
                />
            </div>

            <div className="w-full flex gap-10 mb-8">

                <div className="w-[50%]">
                    <p className="text-[18px] mb-3 font-semibold text-gray-500">
                        Price
                    </p>

                    <input
                        type="text"
                        name="old_price"
                        value={productDetails.old_price}
                        onChange={onChangeHandler}
                        placeholder="Type Price"
                        className="text-gray-500 border-2 border-gray-300 focus:outline-none focus:ring-1 focus:ring-gray-200 focus:border-gray-400 transition duration-200 w-full p-2 rounded-md"
                    />
                </div>

                <div className="w-[50%]">
                    <p className="text-[18px] mb-3 font-semibold text-gray-500">
                        Offer Price
                    </p>

                    <input
                        type="text"
                        name="new_price"
                        value={productDetails.new_price}
                        onChange={onChangeHandler}
                        placeholder="Type Price"
                        className="text-gray-500 border-2 border-gray-300 focus:outline-none focus:ring-1 focus:ring-gray-200 focus:border-gray-400 transition duration-200 w-full p-2 rounded-md"
                    />
                </div>

            </div>

            <div id="productCategory" className="w-[60%] bg-blue-300-200 mb-8 md:w-[30%]">

                <p className="text-[18px] mb-2 font-semibold text-gray-700">
                    Product category
                </p>

                <select
                    value={productDetails.category}
                    onChange={onChangeHandler}
                    name="category"
                    className="text-gray-500 border-2 border-gray-300 focus:outline-none focus:ring-1 focus:ring-gray-200 focus:border-gray-400 transition duration-200 w-[80%] p-2 rounded-md"
                >
                    <option value="men">Men</option>
                    <option value="women">Women</option>
                    <option value="kid">Kid</option>
                </select>

            </div>

            <div id="objectPicture" className="w-[120px] flex items-baseline justify-center rounded-sm border-2 border-gray-400 cursor-pointer bg-gray-200 mb-5">

                <label htmlFor="file-input">

                    <img
                        id="objectPicture-image"
                        src={image ? URL.createObjectURL(image) : upload}
                        className="h-20 w-24 cursor-pointer"
                        alt="upload"
                    />

                </label>

                <input
                    onChange={handleUpload}
                    type="file"
                    name="image"
                    id="file-input"
                    hidden
                />

            </div>

            <button
                onClick={handleAddProduct}
                className="text-[17px] uppercase text-white cursor-pointer font-semibold bg-blue-400 rounded-sm px-10 py-2"
            >
                Add
            </button>

        </div>
    );
}

export default AddProducts;