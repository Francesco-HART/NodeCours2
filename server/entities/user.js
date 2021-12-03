import Joi from 'joi'
import mongoose from 'mongoose';

const UserModel = mongoose.Schema({
    name: {type: String, required: false},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    userRole: {type: String, required: true},
});


const schema = Joi.object({
    email: Joi.string().min(5).max(255).required().email(),
    password: Joi.string().min(5).max(255).required(),
    confirm_password: Joi.string().min(5).max(255).required()
});

const User = mongoose.model("user", UserModel)

export {
    User,
    schema
}
// export default {validateUser, mongoose.model("user", UserModel)r}
