import mongoose, {Schema} from "mongoose";

const tripSchema = new Schema(
    {
        destination: {
            type: String,
            required: true,
            trim: true,
        },
        travelDates: {
            type: String,
            required: true,
            trim: true,
        },
        travelMode: {
            type: String,
            required: true,
            trim: true,
        },
        accomodationType: {
            type: String,
            required: true,
            trim: true,
        },
        budget: {
            type: Number,
            required: true,
        },
        travelerType: {
            type: String,
            required: true,
            trim: true,
        },
        activities: [
            {
                type: String,
                required: true,
                trim: true,
            }
        ],
    }
);

export const Trip = mongoose.model("Trip", tripSchema);