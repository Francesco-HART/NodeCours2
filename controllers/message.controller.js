import {Message, schema} from "../entities/message";
import {Room} from "../entities/room";


export function create(req, res) {
    const { error } = schema.validate(req.body);
    if (error) {
        return res.status(400).send(error.details[0].message);
    }
    let message = req.body.message;
    let roomId = req.body._roomId;

    if (message !== null || roomId !== null) {
        const chat = new Message({message: message, _roomId: roomId})

        chat.save()
            .then((chat) => {
                Room.updateOne({_id: roomId}, {$push: { messages: chat._id }})
                    .then((room) => {
                        res.status(201).json({
                            room
                        });
                    })
                    .catch((err) => {
                        res.status(400).json({
                            error: err
                        });

                    })
                }
            ).catch((error) => {
                res.status(400).json({
                    error: error
                });
            }
        );
    } else {
        return res.statusCode(400).json({"message": "Champs manquant(s)"});
    }
}





