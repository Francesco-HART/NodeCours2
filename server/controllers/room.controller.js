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

export function getAllRoom(req, res){
    Room.find()
        .populate('messages')
        .then((room) =>{
            res.status(200).json(room)
        })
        .catch((err) =>{
            res.status(400).json(err)
        } )
}

export function getRoom(req, res){
    Room.findOne({_id: req.params.id})
        .populate({
            path: 'messages',
            populate : {
                path: "_userId",
            },
        })
        .then((room) =>{
            res.status(200).json(room)
        })
        .catch((err) =>{
            res.status(400).json(err)
        } )
}

export function getDefaultRoom(req, res){
    Room.findOne({}, [], { $orderby : { 'created_at' : -1 } })
        .populate({
            path: 'messages',
            populate : {
                path: "_userId",
            },
        })
        .then(room => {
            res.status(200).json(room);
        })
        .catch(err => {
            res.status(400).json(err);
        })
}