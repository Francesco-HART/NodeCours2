import {Room, schema} from "../entities/room";

export function create(req, res) {
    const { error } = schema.validate(req.body);
    if (error) {
        return res.status(400).send(error.details[0].message);
    }
    let name = req.body.name;

    if (name !== null) {
        const room = new Room({name: name})

        room.save()
            .then((room) => {
                    res.status(201).json({
                        room
                    });
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

export function getRoom(req, res){
    Room.findOne({_id: req.params.id})
        .populate('messages')
        .then((room) =>{
            res.status(200).json(room)
        })
        .catch((err) =>{
            res.status(400).json(err)
        } )
}