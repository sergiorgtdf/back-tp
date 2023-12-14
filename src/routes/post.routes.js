import { Router } from "express";
import { authRequired } from "../middlewares/validateToken.js";
import { commentValidationRules } from "../middlewares/Post/comment.validations.js";
import { postValidationRules } from "../middlewares/Post/post.validatios.js";
import {
    createPost,
    getPosts,
    getPostById,
    deletePost,
    updatePost,
    getPostsByAutor,
    commentAddPost,
    addComment,
} from "../controllers/post.controllers.js";

const postRoutes = Router();

// Todas
postRoutes.get("/posts", getPosts);
// Una
postRoutes.get("/posts/:id", getPostById);
// Crear
postRoutes.post("/posts", authRequired, postValidationRules, createPost);
// Actualizar
postRoutes.put("/posts/:id", authRequired, updatePost);
// Eliminar
postRoutes.delete("/posts/:id", authRequired, deletePost);

postRoutes.put(
    "/comment-posts/:id",
    authRequired,
    commentValidationRules,
    commentAddPost
);

// postRoutes.put("/comment-posts/:id", authRequired, addComment);

postRoutes.get("/posts-by/:autorId", getPostsByAutor);

export default postRoutes;
