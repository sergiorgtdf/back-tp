import Post from "../models/post.model.js";

export const createPost = async (req, res) => {
    try {
        const { title, description, imageURL, content } = req.body;
        const newPost = new Post({
            title,
            description,
            autor: req.user.id,
            imageURL,
            content,
        });
        const postSaved = await newPost.save();
        res.status(201).json(postSaved);
    } catch (error) {
        res.status(500).json(["No se pudo crear el post"]);
        console.error(error);
    }
};

export const getPosts = async (req, res) => {
    try {
        const posts = await Post.find()
            .populate("autor", [`username`, `imageURL`])
            .populate(`comments.autor`, [`username`, `imageURL`])
            .sort({ createdAt: -1 });

        if (!posts) return res.status(404).json(["No se encontraron posts"]);
        return res.status(200).json(posts);
    } catch (error) {
        res.status(500).json(["No se pudo obtener los posts"]);
        console.log(error);
    }
};

export const getPostById = async (req, res) => {
    try {
        // console.log(req.params.id);
        const posts = await Post.findById(req.params.id)
            .populate("autor", [`username`, `imageURL`])
            .populate(`comments.autor`, [`username`, `imageURL`])
            .sort({ createdAt: -1 });

        if (!posts) return res.status(404).json(["No se encontro el post"]);
        // console.log(posts);
        return res.status(200).json(posts);
    } catch (error) {
        res.status(404).json(["El post no existe!"]);
        console.error(error);
    }
};

export const deletePost = async (req, res) => {
    try {
        const { postId } = req.params;
        await Post.findByIdAndDelete(postId);
        res.status(204).json(["Post eliminado"]);
    } catch (error) {
        res.status(404).json(["Post no encontrado"]);
        // console.error(error);
    }
};

export const updatePost = async (req, res) => {
    try {
        const updatedPost = await Post.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
            }
        );
        res.status(200).json(["Actualizado correctamente", updatedPost]);
    } catch (error) {
        res.status(404).json(["Post no encontrado"]);
        // console.error(error);
    }
};

export const getPostsByAutor = async (req, res) => {
    try {
        const posts = await Post.find({ autor: req.params.autorId });
        res.status(200).json(posts).populate("autor", { password: 0 });
    } catch (error) {
        res.status(404).json(["No se encontraron posts"]);
        console.error(error);
    }
};

// ok
export const commentAddPost = async (req, res) => {
    const { comment } = req.body;
    try {
        const postComment = await Post.findByIdAndUpdate(
            req.params.id,
            {
                $push: {
                    comments: { comment: comment, autor: req.user.id },
                },
            },
            { new: true }
        );
        const { post } = await Post.findById(postComment._id).populate(
            `comments.autor`,
            [`username`, `imageURL`]
        );
        console.log(post);
        res.status(200).json({
            success: true,
            post,
        });
    } catch (error) {
        res.status(404).json(error);
    }
};

export const addComment = async (req, res) => {
    const { comment } = req.body;
    console.log(comment);
    console.log(req.params.id);
    console.log(req.user.id);
    try {
        const postComment = await Post.findById(req.params.id);

        postComment.comments.push({
            comment: comment,
            autor: req.user.id,
        });
        const comSaved = postComment.save({ new: true });

        res.status(200).json(comSaved);
    } catch (error) {
        console.log(error);
        res.status(404).json(error);
    }
};
