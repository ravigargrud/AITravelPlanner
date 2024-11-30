import { apiError } from "../utils/apiError.js";
import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";

export const verifyJWT = async (req, res, next) => {
    try {
        const token = req.cookies.accessToken || req.headers("Authorization")?.replace("Bearer ", "");
        if (!token) {
            throw new apiError(401, "Unauthorized Access");
        }

        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

        const user = await User.findById(decoded?._id).select("-password -refreshToken");

        if (!user) {
            throw new apiError(401, "Invalid Access Token");
        }

        req.user = user;

        next();
    }

    catch (error) {
        throw new apiError(401, error?.message || "Unauthorized Access");
    }

}
