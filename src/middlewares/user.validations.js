import { body, validationResult } from "express-validator";

export const userValidationRules = [
    body(`username`)
        .notEmpty()
        .withMessage(`Username is required`)
        .isLength({ min: 4 })
        .withMessage(`Username must be at least 6 characters long`),

    body(`email`)
        .notEmpty()
        .withMessage(`Email is required`)
        .isEmail()
        .withMessage(`Email is not valid`),

    body(`password`)
        .notEmpty()
        .withMessage(`Password is required`)
        .isLength({ min: 6 })
        .withMessage(`Password must be at least 6 characters long`),
];

export const loginValidationRules = [
    body(`email`)
        .notEmpty()
        .withMessage(`Email is required`)
        .isEmail()
        .withMessage(`Email is not valid`),

    body(`password`)
        .notEmpty()
        .withMessage(`Password is required`)
        .isLength({ min: 6 })
        .withMessage(`Password must be at least 6 characters long`),
];

export const errorHandle = (req, res, next) => {
    const err = validationResult(req);
    if (!err.isEmpty()) {
        console.log(err);
        // return res.status(400).send({ message: [errmsg] });

        // return res.status(400).send([err.errors[0].msg]);
    }

    next();
};
