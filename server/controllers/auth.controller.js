import Joi from "joi";
import {signIn, signOut} from "../services/auth";

/**
 * Function used to Login a user
 * @param req
 * @param res
 * @param next
 * @returns {*}
 */
export function login(req, res, next) {
    const {error} = schema.validate(req.body);
    if (error) {
        return res.status(400).json(error.details[0].message);
    }
    signIn(req, res, next);
}

/**
 * function use to logout a user
 * @param req
 * @param res
 * @param next
 */
export function logout(req, res, next) {
    signOut(req, res, next);
}


const schema = Joi.object({
    email: Joi.string().min(5).max(255).required().email(),
    password: Joi.string().min(5).max(255).required()
});


