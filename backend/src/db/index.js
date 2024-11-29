import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";

const connectDB = async () => {
    try {
        await mongoose.connect(`${process.env.MONGO_URI}/${DB_NAME}`);
        console.log("Connected to the database");
    }
    catch (error) {
        console.log("Error connecting to the database", error);
    }
}

export default connectDB;