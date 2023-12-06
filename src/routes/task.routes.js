import { Router } from "express";
import { authRequired } from "../middlewares/validateToken.js";

import {
    getTasks,
    createTask,
    getTask,
    updateTask,
    deleteTask,
} from "../controllers/tasks.controllers.js";

const taskRoutes = Router();

// Todas
taskRoutes.get("/tasks", authRequired, getTasks);
// Una
taskRoutes.get("/tasks/:id", authRequired, getTask);
// Crear
taskRoutes.post("/tasks", authRequired, createTask);
// Actualizar
taskRoutes.put("/tasks/:id", authRequired, updateTask);
// Eliminar
taskRoutes.delete("/task/:id", authRequired, deleteTask);

export default taskRoutes;
