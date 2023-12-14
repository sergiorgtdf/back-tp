const commentSchema = new Schema(
    {
        content: {
            type: String,
            required: true,
            trim: true,
        },
        autor: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        post: {
            type: Schema.Types.ObjectId,
            ref: "Post",
            required: true,
        },
    },
    {
        timestamps: true,
        versionKey: false,
    }
);
