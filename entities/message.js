import Joi from 'joi'
import mongoose from 'mongoose';

const MessageModel = mongoose.Schema({
    message: {type: String, required: true},
    _roomId: { type: mongoose.Schema.Types.ObjectId, ref: 'room' },
}, {
    timestamps: true
});


const schema = Joi.object({
    message: Joi.string().min(3).max(250).required(),
    _roomId: Joi.string().min(3).max(250).required(),
});

const Message = mongoose.model("Message", MessageModel, "messages")

export {
    Message,
    schema
}
