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

    // 1. Get user details from frontend ( or from postman).
    // 2. Check if user already exist.
    // 3. Created size 200 cartData
    // 4. Creating user by userModel.create (CRUD) to store in database.
    // 5. Generate the cookie
    // 6. Remove password and refresh token field from response. 
    // 7. Check for user creation- if true then return res.


    const { email, userName, password } = req.body; //1

    try {
        const existedUser = await UserModel.findOne({ email }) //2
        if (existedUser) {
            return res.status(400).json({
                success: false,
                message: "User already exist with this email ",
            })
        }

        let cart = {}; //3
        for (let i = 0; i < 200; i++) {
            cart[i] = 0;
        }

        const user = await UserModel.create({ //4
            email,
            password,
            userName,
            cartData: cart,
        })

        const token = jwt.sign( //5
            { userId: user.id, email: user.email },
            process.env.SECRET,
            { expiresIn: "1d" }
        )


        const createdUser = await UserModel.findById(user.id).select( //6
            "-password "
        )

        if (!createdUser) {
            return res.status(500).json({
                success: false,
                message: "user could not be created",
            })
        }

        return res.status(201).json({
            success: true,
            message: "User registered successfully",
            token,
            createdUser
        });

    } catch (error) {
        return res.status(500).json({
            error: error,
            success: false,
            message: "Something went wrong while registering user",
        })
    }
}

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