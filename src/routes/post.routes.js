import { Router } from "express";
import { authRequired } from "../middlewares/validateToken.js";

import {
    createPost,
    getPosts,
    getPostById,
    deletePost,
    updatePost,
    getPostsByAutor,
    commentPost,
} from "../controllers/post.controllers.js";

const postRoutes = Router();

// Todas
postRoutes.get("/posts", getPosts);
// Una
postRoutes.get("/posts/:id", getPostById);
// Crear
postRoutes.post("/posts", authRequired, createPost);
// Actualizar
postRoutes.put("/posts/:id", authRequired, updatePost);
// Eliminar
postRoutes.delete("/posts/:id", authRequired, deletePost);

postRoutes.put("/comment-posts/:id", authRequired, commentPost);

postRoutes.get("/posts-by/:autorId", getPostsByAutor);

export default postRoutes;
