import mongoose, {Schema} from "mongoose";

const itinerarySchema = new Schema(
    {
        date: {
            type: Date,
            required: true,
        },
        time: {
            type: String,
            required: true,
            trim: true,
        },
        placeName: {
            type: String,
            required: true,
            trim: true,
        },
        placeDetails: {
            type: String,
            required: true,
            trim: true,
        },
        ticketPrice: {
            type: String,
            required: true,
            trim: true,
        },
        travelTime: {
            type: String,
            required: true,
            trim: true,
        },
    }
);

export const Itinerary = mongoose.model("Itinerary", itinerarySchema);