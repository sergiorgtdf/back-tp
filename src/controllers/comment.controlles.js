import Comment from "../models/Comment";

export const createComment = async (req, res) => {
    try {
        const { postId, description } = req.body;
        const newComment = new Comment({
            postId: req.params.postId,
            description,
            autor: req.params.userId,
        });
        const commentSaved = await newComment.save();
        res.status(201).json(commentSaved);
    } catch (error) {
        res.status(500).json(["No se pudo crear el comentario"]);
        console.error(error);
    }
};

export const getComments = async (req, res) => {
    try {
        const comments = await Comment.find(postId: req.params.postId);
        res.status(200).json(comments).populate("autor", { password: 0 });
    } catch (error) {
        res.status(404).json(["No se encontraron comentarios"]);
        console.error(error);
    }
};

export const getCommentById = async (req, res) => {
    try {
        const comment = await Comment.findById(req.params.commentId);
        res.status(200).json(comment).populate("autor", { password: 0 });
    } catch (error) {
        res.status(404).json(["El comentario no existe!"]);
        console.error(error);
    }
};

