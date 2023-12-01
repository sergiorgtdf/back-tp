import Jwt from "jsonwebtoken";
import { settingDotEnvSecret } from "../config/config.js";

const { secret } = settingDotEnvSecret();

export const createAccessToken = (payload) => {
    return new Promise((resolve, reject) => {
        Jwt.sign(payload, secret, { expiresIn: "1h" }, (err, token) => {
            err ? reject(err) : resolve(token);
        });
    });
};
