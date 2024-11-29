import mongoose, {Schema} from "mongoose";

const accomodationSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },
        location: {
            type: String,
            required: true,
            trim: true,
        },
        price: {
            type: String,
            required: true,
            trim: true,
        },
        image: {
            type: String,
            required: true,
            trim: true,
        },
        latitude: {
            type: String,
            required: true,
            trim: true,
        },
        longitude: {
            type: String,
            required: true,
            trim: true,
        },
        reviews: {
            type: String,
            required: true,
            trim: true,
        },
        description: {
            type: String,
            required: true,
            trim: true,
        },
    }
);

export const Accomodation = mongoose.model("Accomodation", accomodationSchema);