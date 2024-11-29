import mongoose, {Schema} from "mongoose";

const placeSchema = new Schema(
    {
        tripDetails: {
            type: Schema.Types.ObjectId,
            ref: "Trip",
        },
        accomodationOptions: [
            {
                type: Schema.Types.ObjectId,
                ref: "Accomodation",
            },
        ],
        itinerary: [
            {
                type: Schema.Types.ObjectId,
                ref: "Itinerary",
            },
        ]
    }, {timestamps: true}
);

export const Place = mongoose.model("Place", placeSchema);