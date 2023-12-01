import { body, validationResult } from "express-validator";

export const postValidationRules = [
    body(`title`)
        .notEmpty()
        .withMessage(`El Titulo es requerido`)
        .isLength({ min: 6 })
        .withMessage(`El Titulo debe contener al menos 6 caracteres`),

    body(`description`)
        .notEmpty()
        .withMessage(`La Descripcion una descripcion`)
        .isLength({ min: 6 })
        .withMessage(`La Descripcion debe contener al menos 6 caracteres`),

    body(`autor`)
        .notEmpty()
        .withMessage(`Se produjo un error, debe estar logueado`),

    body(`imageURL`).notEmpty().withMessage(`Debe ingresar una imagen`),
];

export const errorHandle = (req, res, next) => {
    const err = validationResult(req);
    if (!err.isEmpty()) {
        return res.status(400).send([err.errors[0].msg]);
    }

    next();
};
