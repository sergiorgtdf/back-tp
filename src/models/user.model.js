import { Schema, model } from "mongoose";

const userSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
            trim: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },
        imageURL: {
            type: String,
            default:
                "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg",
        },
    },
    {
        timestamps: true,
        versionKey: false,
    }
);

export default model("User", userSchema);
