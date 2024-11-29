import mongoose, {Schema} from "mongoose";

const userSchema = new Schema(
    {
        fullName: {
            type: String,
            required: true,
            trim: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
            index: true,
        },
        password: {
            type: String,
            required: true,
        },
        places: [
            {
                type: Schema.Types.ObjectId,
                ref: "Place",
            },
        ],
    }, {timestamps: true}
);

export const User = mongoose.model("User", userSchema);