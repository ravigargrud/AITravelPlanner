import { User } from '../models/user.model.js';
import { apiError } from "../utils/apiError.js";
import { apiResponse } from '../utils/apiResponse.js';
import { asyncHandler } from '../utils/asyncHandler.js';
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
    console.log(avatarLocalPath);
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

export {registerUser};