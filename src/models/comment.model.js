import { Schema, model } from "mongoose";

const commentSchema = new Schema(
    {
        postId: {
            type: Schema.Types.ObjectId,
            ref: "post",
            required: true,
        },
        autor: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        description: {
            type: String,
            required: true,
            unique: true,
            trim: true,
        },
    },
    {
        timestamps: true,
        versionKey: false,
    }
);
export default model("Comment", commentSchema);
