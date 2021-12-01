import Joi from 'joi'
import mongoose from 'mongoose';

const RoomModel = mongoose.Schema({
    name: {type: String, required: true},
    messages: [{type: mongoose.Schema.Types.ObjectId, ref: 'Message'}],
});


const schema = Joi.object({
    name: Joi.string().min(3).max(50).required(),
    // _chat: Joi.string().required(),
});

const Room = mongoose.model("Room", RoomModel, "rooms")

export {
    Room,
    schema
}
