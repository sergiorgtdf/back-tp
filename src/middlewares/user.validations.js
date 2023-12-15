import { body, validationResult } from "express-validator";

export const userValidationRules = [
    body(`username`)
        .notEmpty()
        .withMessage(`El nombre de usuario es requerido`)
        .isLength({ min: 4 })
        .withMessage(
            `El nombre de usuario debe contener al menos 4 caracteres`
        ),

    body(`email`)
        .notEmpty()
        .withMessage(`El Email es requerido`)
        .isEmail()
        .withMessage(`El Email no es valido`),

    body(`password`)
        .notEmpty()
        .withMessage(`El Password es requerido`)
        .isLength({ min: 6 })
        .withMessage(`El Password debe contener al menos 6 caracteres`),
];

export const loginValidationRules = [
    body(`email`)
        .notEmpty()
        .withMessage(`El Email es requerido`)
        .isEmail()
        .withMessage(`El Email no es valido`),

    body(`password`)
        .notEmpty()
        .withMessage(`El Password es requerido`)
        .isLength({ min: 6 })
        .withMessage(`El Password debe contener al menos 6 caracteres`),
];

export const errorHandle = (req, res, next) => {
    const err = validationResult(req);
    if (!err.isEmpty()) {
        // Envia todos los errores
        // return res.status(400).json(err.errors.map((e) => e.msg));

        // Envia 1 error
        return res.status(400).send([err.errors[0].msg]);
    }

    next();
};
