import { body, validationResult } from "express-validator";

export const commentValidationRules = [
    body(`comment`)
        .notEmpty()
        .withMessage([`El comentario es requerido`])
        .isLength({ min: 6 })
        .withMessage([`El comentario debe contener al menos 6 caracteres`]),
];

export const errorHandle = (req, res, next) => {
    const err = validationResult(req);
    if (!err.isEmpty()) {
        return res.status(400).send([err.errors[0].msg]);
    }

    next();
};
