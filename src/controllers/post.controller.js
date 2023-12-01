import Post from "../models/Post";

export const createPost = async (req, res) => {
    try {
        const { title, description, autor, imageURL } = req.body;
        const newPost = new Post({
            title,
            description,
            autor: req.userId,
            imageURL,
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
        const posts = await Post.find();
        res.status(200).json(posts).populate("autor", { password: 0 });
    } catch (error) {
        res.status(404).json(["No se encontraron posts"]);
        console.error(error);
    }
};

export const getPostById = async (req, res) => {
    try {
        const post = await Post.findById(req.params.postId);
        res.status(200).json(post).populate("autor", { password: 0 });
    } catch (error) {
        res.status(404).json(["El post no existe!"]);
        console.error(error);
    }
};

export const deletePostById = async (req, res) => {
    try {
        const { postId } = req.params;
        await Post.findByIdAndDelete(postId);
        res.status(204).json(["Post eliminado"]);
    } catch (error) {
        res.status(404).json(["Post no encontrado"]);
        // console.error(error);
    }
};

export const updatePostById = async (req, res) => {
    try {
        const updatedPost = await Post.findByIdAndUpdate(
            req.params.postId,
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
