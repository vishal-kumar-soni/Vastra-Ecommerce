import { FileModel } from '../Models/file.model.js'
import { UserModel } from '../Models/user.model.js';


// Function to add products to the database
const addProducts = async (req, res) => {
    try {
        const Product = await FileModel.find({})
        let id;
        if (Product.length > 0) {
            let lastProduct_array = Product.slice(-1)
            let lastProduct = lastProduct_array[0];
            id = lastProduct.id + 1;
        } else {
            id = 1;
        }

        const { name, image, category, old_price, new_price } = req.body;

        const product = await FileModel.create({
            id,
            name,
            image,
            category,
            old_price,
            new_price,
        })

        await product.save();

        if (!product) {
            return res.status(500).json({
                success: false,
                message: "could not create the product",
            })
        }

        return res.status(200).json({
            success: true,
            message: "Product has been successfully created",
            data: product
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "could not create the product in the database",
        })
    }
}


// Function to remove products from the database
const removeProduct = async (req, res) => {
    try {
        const deletedProduct = await FileModel.findOneAndDelete({ id: req.body.id })

        return res.status(200).json({
            success: true,
            message: "Successfully removed the product",
            deletedProduct: deletedProduct
        })

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Could not remove the product",
        })
    }
}


// Function to fetch all the products
const getAllProducts = async (req, res) => {
    try {
        const products = await FileModel.find()

        return res.status(200).json({
            success: true,
            message: "Successfully fetched all the products",
            data: products
        })

    } catch (error) {
        return res.status(500).json({
            success: false,
        })
    }
}


// Function to add cart
const addCart = async (req, res) => {
    try {

        const { itemId } = req.body;

        const user = await UserModel.findById(req.user._id);


        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        if (user.cartData[itemId]) {
            user.cartData[itemId] += 1;
        } else {
            user.cartData[itemId] = 1;
        }


        user.markModified("cartData");
        await user.save();

        console.log(user.email, "addcart updated in controller")

        return res.status(200).json({
            success: true,
            message: "Item added to cart",
            cartData: user.cartData
        });

    } catch (error) {
        console.log(error);

        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};


// Function to remove cart
const removeCart = async (req, res) => {
    try {
        const { itemId } = req.body;

        const user = await UserModel.findById(req.user._id);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        // Handle item count safely
        if (user.cartData[itemId] > 0) {
            user.cartData[itemId] -= 1;
        }

        user.markModified("cartData");
        await user.save();

        return res.status(200).json({
            success: true,
            cartData: user.cartData,
        });


    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Error occur while removing item from cart"
        });
    }
};

// Function to get cart data for any user
const getCart = async (req, res) => {
    try {
        const user = await UserModel.findById(req.user._id);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }
        return res.status(200).json({
            success: true,
            cartData: user.cartData,
            message:"cart is get"
        });

    } catch (error) {
        console.log(error);

        return res.status(500).json({
            success: false,
            message: "Error occur while fetching cart data"
        });
    }
}

export { addProducts, removeProduct, getAllProducts, addCart, removeCart, getCart }