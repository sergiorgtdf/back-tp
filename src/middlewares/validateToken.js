import jwt from "jsonwebtoken";
import { settingDotEnvSecret } from "../config/config.js";

const { secret } = settingDotEnvSecret();

export const authRequired = (req, res, next) => {
    const { token } = req.cookies;

    if (!token)
        return res
            .status(401)
            .json({ message: "No autorizado, no tiene token" });

    // verifuca el token, con la clave secreta
    jwt.verify(token, secret, (err, user) => {
        if (err) return res.status(403).json({ message: "Token Invalido" });
        console.log(user);

        req.user = user;
        next();
    });
};
