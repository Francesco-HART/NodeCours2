import {Message, schema} from "../entities/message";
import {Room} from "../entities/room";
import app from "../index";

/**
 * Function use to create a message in chat
 * @param req
 * @param res
 * @returns {*}
 */
export function create(req, res) {
    const {error} = schema.validate(req.body);
    if (error) {
        return res.status(400).send(error.details[0].message);
    }
    let message = req.body.message;
    let roomId = req.body._roomId;

  if (message !== null || roomId !== null || req.user._id !== null) {
    const chat = new Message({ message: message, _userId: req.user._id });

        chat.save()
            .then( async (chat) => {
                const msg = await Message.findById(chat._id).populate('_userId')
                Room.updateOne({_id: roomId}, {$push: {messages: chat._id}})
                    .then((room) => {
                        app.io.emit(roomId, msg);
                        res.status(201).json({
                            msg,
                        });
                    })
                    .catch((err) => {
                        res.status(400).json({
                            error: err,
                        });
                    });
            })
            .catch((error) => {
                res.status(400).json({
                    error: error,
                });
            });
    } else {
        return res.statusCode(400).json({message: "Champs manquant(s)"});
    }
}
