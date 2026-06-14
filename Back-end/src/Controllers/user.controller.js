import { UserModel } from '../Models/user.model.js'
import jwt from 'jsonwebtoken'


// Function to login a user
const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "All input fields are required",
            });
        }

        const existedUser = await UserModel.findOne({ email });

        if (!existedUser) {
            return res.status(404).json({
                success: false,
                message: "User does not exist with this email",
            });
        }

        const isPasswordMatch = await existedUser.isPasswordCorrect(password);

        if (!isPasswordMatch) {
            return res.status(400).json({
                success: false,
                message: "Password is incorrect",
            });
        }

        const token = jwt.sign(
            {
                userId: existedUser._id,
                email: existedUser.email,
            },
            process.env.SECRET,
            {
                expiresIn: "1d",
            }
        );

        const userResponse = existedUser.toObject();
        delete userResponse.password;

        return res.status(200).json({
            success: true,
            message: "Successfully login",
            token,
            user: userResponse,
        });

    } catch (error) {
        console.error("Login Error:", error);

        return res.status(500).json({
            success: false,
            message: "User could not be logged in",
        });
    }
};

// Function to Register a user
const registerUser = async (req, res) => {
    const { email, userName, password } = req.body;

    try {
        const existedUser = await UserModel.findOne({ email });

        if (existedUser) {
            return res.status(400).json({
                success: false,
                message: "User already exists with this email",
            });
        }

        let cart = {};

        for (let i = 0; i < 50; i++) {
            cart[i] = 0;
        }

        const user = await UserModel.create({
            email,
            password,
            userName,
            cartData: cart,
        });

        const token = jwt.sign(
            {
                userId: user._id,
                email: user.email,
            },
            process.env.SECRET,
            {
                expiresIn: "1d",
            }
        );

        const createdUser = await UserModel.findById(user._id)
            .select("-password");

        return res.status(201).json({
            success: true,
            message: "User registered successfully",
            token,
            user: createdUser,
        });

    } catch (error) {
        console.error(error);

        return res.status(500).json({
            success: false,
            message: "Something went wrong while registering user",
        });
    }
};

// Function to logout a user
const logout = async (req, res) => {
    try {
        localStorage.removeItem("token");
        // setToken(null);
        window.location.href = "/login";

        return res.status(200).json({
            success: true,
            message: "Successfully logout",
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "user could not be logged out",
        })
    }
}


export { login, registerUser, logout }