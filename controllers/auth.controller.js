import Joi from "joi";
import {signIn, signOut} from "../services/auth";

export function login(req, res, next) {
    console.log("in login")
    const {error} = schema.validate(req.body);
    if (error) {
        return res.status(400).json(error.details[0].message);
    }
    signIn(req, res, next);
}

export function logout(req, res, next) {
    console.log(req.user, "iciiiii")
    signOut(req, res, next);
}


const schema = Joi.object({
    email: Joi.string().min(5).max(255).required().email(),
    password: Joi.string().min(5).max(255).required()
});


