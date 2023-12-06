import { Schema, model } from "mongoose";

const taskSchema = new Schema(
    {
        title: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        date: {
            type: Date,
            default: Date.now,
        },
        completed: {
            type: Boolean,
            default: false,
        },
        user: {
            type: Schema.Types.ObjectId,
            ref: "User",
        },
    },
    {
        timestamps: true,
        versionKey: false,
    }
);

export default model("Task", taskSchema);
