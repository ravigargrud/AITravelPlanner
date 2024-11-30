import { User } from '../models/user.model.js';
import { apiError } from "../utils/apiError.js";
import { apiResponse } from '../utils/apiResponse.js';
import uploadToCloudinary from '../utils/cloudinary.js';

const registerUser = async (req, res) => {
    // Code to register a new user
    // Get request body

    const { fullName, email, password } = req.body;

    // Validate request body

    if (!fullName || !email || !password || fullName === "" || email === "" || password === "") {
        throw new apiError(400, "Please provide all required fields");
    }

    // Check if user already exists

    const userExists = await User.findOne({ email });

    if (userExists) {
        throw new apiError(400, "User with this email already exists");
    }

    // upload avatar to cloudinary
    let avatar = {url: ""};
    if (req.files && Array.isArray(req.files.avatar) && req.files.avatar.length > 0) {
    const avatarLocalPath = req.files?.avatar[0]?.path;
    if (avatarLocalPath !== undefined) {
        avatar = await uploadToCloudinary(avatarLocalPath);
         // check if avatar is uploaded
        if (!avatar) {
            throw new apiError(500, "Error uploading avatar");
        }
    }
    }

    // create new user

    const newUser = new User({
        fullName,
        email,
        password,
        avatar: avatar.url
    });

    // save user to database

    await newUser.save();

    const createdUser = await User.findById(newUser._id).select(
        "-password -refreshToken"
    )


    // check if user is created

    if (!createdUser) {
        throw new apiError(500, "Error creating user");
    }

    // send response

    return res.status(201).json(new apiResponse(201, createdUser, "User created successfully"));

}

const  generateToken = async (userId) => {
    
    // Generate token
    const user = await User.findById(userId);
    const accessToken = await user.generateAccessToken();
    const refreshToken = await user.generateRefreshToken();

    // Check if token is generated

    if (!accessToken || !refreshToken) {
        throw new apiError(500, "Error generating token");
    }

    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });

    return { accessToken, refreshToken };

}

const loginUser = async (req, res) => {

    // Code to login a user
    // Get request body

    const { email, password } = req.body;

    // Validate request body

    if (!email || !password || email === "" || password === "") {
        throw new apiError(400, "Please provide all required fields");
    }

    // Check if user exists

    const user = await User.findOne({ email });

    if (!user) {
        throw new apiError(400, "User with this email does not exist");
    }

    // Check if password is correct

    const isPasswordCorrect = await user.isPasswordCorrect(password);

    if (!isPasswordCorrect) {
        throw new apiError(400, "Invalid password");
    }

    // Generate token

    const { accessToken, refreshToken } = await generateToken(user._id);

    const loggedInUser = await User.findById(user._id).select("-password -refreshToken");

    // send response

    const options = {
        httpOnly: true,
        secure: true
    }

    return res
    .status(200)
    .cookie("refreshToken", refreshToken, options)
    .cookie("accessToken", accessToken, options)
    .json(new apiResponse(
        200,
        {
            user: loggedInUser, accessToken, refreshToken
        },
        "User logged in successfully"
        )
    );
}

const logoutUser = async (req, res) => {
    // Clear refresh token field from User
    await User.findByIdAndUpdate(
        req.user._id,
        {
            $unset: {
                refreshToken: 1 // this removes the field from document
            }
        },
        {
            new: true
        }
    );


    // Clear cookies

    const options = {
        httpOnly: true,
        secure: true
    }

    return res
    .status(200)
    .clearCookie("refreshToken", options)
    .clearCookie("accessToken", options)
    .json(new apiResponse(200, {}, "User logged out successfully"));
}

export {registerUser, loginUser, logoutUser};