import User from "../models/user.model.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

import { settingDotEnvSecret } from "../config/config.js";

import { createAccessToken } from "../middlewares/jwt.validator.js";

// -------------------------User--------------------------
// TODO: OK;
export const createUser = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        // Validar Usuario
        const userFound = await User.findOne({ email });
        if (userFound)
            return res.status(400).json({ message: "El usuario ya existe!" });

        const passwordHash = await bcrypt.hash(password, 10);

        const newUser = new User({
            username,
            email,
            password: passwordHash,
        });

        const savedUser = await newUser.save();

        // Crea el token
        const token = await createAccessToken({ id: savedUser._id });
        // Envia el token
        res.cookie("token", token);
        res.status(200).json({
            id: savedUser._id,
            username: savedUser.username,
            email: savedUser.email,
            createAt: savedUser.createAt,
            updatedAt: savedUser.updatedAt,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(404).json(["El usuario no existe!"]);
        console.error(error);
    }
};

export const getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.userId);

        res.status(200).json(user);
    } catch (error) {
        res.status(404).json(["El usuario no existe!"]);
        console.error(error);
    }
};

export const deleteUserById = async (req, res) => {
    try {
        const { userId } = req.params;
        await User.findByIdAndDelete(userId);
        res.status(204).json();
    } catch (error) {
        res.status(404).json(["Usuario no encontrado"]);
        // console.error(error);
    }
};

export const updateUserById = async (req, res) => {
    try {
        const updatedUser = await User.findByIdAndUpdate(
            req.params.userId,
            req.body,
            {
                new: true,
            }
        );
        res.status(200).json(updatedUser);
    } catch (error) {
        res.status(404).json(["Usuario no encontrado"]);
        console.error(error);
    }
};

const { secret } = settingDotEnvSecret();
export const verifyToken = async (req, res) => {
    try {
        //recibe el cookie del frontend
        const token = req.token;
        // const token = req.headers.authorization;
        // verifica que venga un token
        if (!token)
            return res
                .status(401)
                .json(["No tienes autorizacion para realizar esta accion"]);
        // verifica el token
        const decoded = jwt.verify(token, secret);
        if (!decoded)
            return res
                .status(401)
                .json(["No tienes autorizacion para realizar esta accion"]);
        // verifica que el usuario exista en la DB
        const user = await User.findById(decoded.id);
        if (!user)
            return res
                .status(401)
                .json(["No tienes autorizacion para realizar esta accion"]);
        // si todo esta bien, envia el usuario
        res.status(200).json({
            id: user.id,
            username: user.username,
            email: user.email,
            avatarUrl: user.avatarURL,
        });
    } catch (error) {
        res.status(500).json([
            "No tienes autorizacion para realizar esta accion",
        ]);
    }
};

// TODO: OK;
export const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        // Buscamos user en la DB
        const user = await User.findOne({ email });

        if (!user)
            return res.status(400).json({ message: "Usuario no existe!" });

        // Comparamos password
        const isMatchPassword = await bcrypt.compare(password, user.password);

        if (!isMatchPassword)
            return res.status(401).json({ message: "Password incorrecto" });

        // Crea el token
        const token = await createAccessToken({ id: user._id });
        // res.json({ token, foundUser });
        res.cookie("token", token);

        res.status(200).json({
            id: user._id,
            username: user.username,
            email: user.email,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt,
        });
    } catch (error) {
        return res
            .status(500)
            .json({ message: `No se pudo iniciar sesion: ${error}` });
    }
};

// TODO: OK;
export const logout = async (req, res) => {
    res.cookie("token", "", { expires: new Date(0) });
    return res.status(200).json({ message: "Nos vemos pronto!" });
};

export const profile = async (req, res) => {
    try {
        console.log(req.headers.cookie);
        console.log("Id from profile", req.user._id);
        const userFound = await User.findById(req.user.id);
        // const userFound = await User.findById(req.user.id);
        if (!userFound)
            return res.status(404).json({ message: "El usuario no existe" });
        res.status(200).json({
            id: userFound._id,

            username: userFound.username,
            email: userFound.email,
            imageURL: userFound.imageURL,
            createdAt: userFound.createdAt,
            updatedAt: userFound.updatedAt,
        });
    } catch (error) {
        res.status(500).json({ message: "Se produjo un error" });
        console.error(error);
    }
};
