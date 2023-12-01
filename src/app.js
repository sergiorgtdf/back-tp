import express from "express";
import morgan from "morgan";
import cors from "cors";
import cookieParser from "cookie-parser";
import helmet from "helmet";

// -------------------------------IMPORTS------------------------------

import { connectMongo } from "./database/db.js";
import userRoutes from "./routes/user.routes.js";
// import taskRoutes from "./routes/task.routes.js";
// import postRoutes from "./routes/post.routes.js";

export const server = express();

// -------------------------------CONNECT DB------------------------------
connectMongo();
// createRoles();
// -------------------------------CONNECT DB------------------------------

// ---------------------------------USE------------------------------
// server.use(helmet());
server.use(
    cors({
        origin: "http://localhost:5173",
        credentials: true,
    })
);

server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.use(cookieParser());
server.use(morgan("tiny"));

server.use("/api/", userRoutes);
// server.use("/api/", taskRoutes);
// server.use("/api/", postRoutes);
// ---------------------------------USE------------------------------
