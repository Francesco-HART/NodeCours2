import {Room, schema} from "../entities/room";

/**
 * Function used to create a room
 * @param req
 * @param res
 * @returns {*}
 */
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

/**
 * function used to get all rooms
 * @param req
 * @param res
 */
export function getAllRoom(req, res){
    Room.find()
    .populate({
        path: 'messages',
        options: {
            limit: 20,
        },
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

/**
 * Function used to get a specify room
 * @param req
 * @param res
 */
export function getRoom(req, res){
    Room.findOne({_id: req.params.id})
    .populate({
        path: 'messages',
        options: {
            limit: 20,
        },
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

/**
 * Function used to get the default room
 * @param req
 * @param res
 */
export function getDefaultRoom(req, res){
    Room.findOne({}, [], { $orderby : { 'created_at' : -1 } })

    .populate({
        path: 'messages',
        options: {
            limit: 20,
        },
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