import Joi from 'joi'
import mongoose from 'mongoose';

const UserModel = mongoose.Schema({
    name: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    userRole: {type: String, required: true},
});


const schema = Joi.object({
    name: Joi.string().min(3).max(50).required(),
    email: Joi.string().min(5).max(255).required().email(),
    password: Joi.string().min(5).max(255).required()
});

const User = mongoose.model("user", UserModel)

export {
    User,
    schema
}
// export default {validateUser, mongoose.model("user", UserModel)r}