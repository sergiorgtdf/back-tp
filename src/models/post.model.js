import { Schema, model } from "mongoose";

const postSchema = new Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true,
        },
        description: {
            type: String,
            required: true,
            trim: true,
        },

        autor: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        imageURL: {
            type: String,
            required: true,
        },
        likes: [
            {
                type: Schema.Types.ObjectId,
                ref: "User",
            },
        ],
        comments: [
            {
                comment: String,
                created: { type: Date, default: Date.now },
                autor: {
                    type: Schema.Types.ObjectId,
                    ref: "User",
                },
            },
        ],
    },
    {
        timestamps: true,
        versionKey: false,
    }
);

export default model("Post", postSchema);
