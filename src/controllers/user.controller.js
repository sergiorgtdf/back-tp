import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import { settingDotEnvSecret } from "../config/config.js";
import User from "../models/user.model.js";

import { createAccessToken } from "../middlewares/jwt.validator.js";

// -------------------------User--------------------------
export const createUser = async (req, res) => {
    try {
        const { username, email, password, roles } = req.body;
        // Validar Usuario
        const userFound = await User.findOne({ email });
        if (userFound) return res.status(400).json(["El usuario ya existe!"]);

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
            message: "Se registro correctamente!",
            token,
        });
    } catch (error) {
        // res.status(500).json({ message: "Error registering user", error });
        res.status(500).json([error.message]);
        // console.error(error);
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
        const user = await User.findById(_id: req.params.userId);
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
        const { token } = req.cookies;
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

export const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        // Buscamos user en la DB
        const foundUser = await User.findOne({ email });

        if (!foundUser) return res.status(400).json(["Usuario no existe!"]);

        // Comparamos password
        const matchPassword = await bcrypt.compare(
            password,
            foundUser.password
        );

        if (!matchPassword)
            return res.status(401).json(["Password incorrecto"]);

        // Crea el token
        const token = await createAccessToken({ id: foundUser._id });
        res.json({ token, foundUser });
        console.log(token);

        res.status(200).json({
            message: "Bienvenido!",
            username: foundUser.username,
            token,
        });
    } catch (error) {
        return res.status(500).json(["No se pudo iniciar sesion"]);
    }
};

export const logout = async (req, res) => {
    res.cookie("token", "", { expires: new Date(0) });
    return res.status(200).json({ message: "Nos vemos pronto!" });
};

export const profile = async (req, res) => {
    try {
        // console.log(req.headers.cookie);
        const userFound = await User.findById(req.user.id);
        // const userFound = await User.findById(req.user.id);
        if (!userFound)
            return res.status(404).json({ message: "El usuario no existe" });
        res.status(200).json({ message: "Profile", userFound });
    } catch (error) {
        res.status(500).json({ message: "Se produjo un error" });
        console.error(error);
    }
};
