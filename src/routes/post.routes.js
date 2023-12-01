import { Router } from "express";

import {
    createPost,
    updatePostById,
    getPostById,
    getPosts,
    deletePostById,
} from "../controllers/post.controller.js";

import {
    loginValidationRules,
    errorHandle,
} from "../middlewares/user.validations.js";

import {
    errorHandle,
    postValidationRules,
} from "../middlewares/Post/post.validations.js";

const postRoutes = Router();

// Create un nuevo post
postRoutes.post("/posts", postValidationRules, errorHandle, createPost);
// Lista todos los posts
postRoutes.get("/posts", getPosts);
// Busca por id
postRoutes.get("/posts/:id", getPostById);
// actualiza por id
postRoutes.put("/update/:id", postValidationRules, errorHandle, updatePostById);

// Elimina por id
postRoutes.delete("/delete/:id", deletePostById);

export default postRoutes;
