// import User from "../entities/user"
import bcrypt from "bcrypt";
import {User, schema} from "../entities/user";


export function create(req, res) {
    const { error } = schema.validate(req.body);
    if (error) {
        return res.status(400).send(error.details[0].message);
    }
    let name = req.body.name;
    let password = req.body.password;
    let email = req.body.email;

    if (name !== null || password !== null || email !== null) {
        const hash = bcrypt.hashSync(password, 10);
        const user = new User({name: name, email: email, password: hash})

        user.save()
            .then((user) => {
                    res.status(201).json({
                        user
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

export function getUser(req, res) {
    User.findById(req.params.id)
        .then((user) => {
            return res.status(200).json(user);
        })
        .catch((err) => {
            return res.status(400).json("Cannot find user")
        })
}


export function updateUser(req, res) {
    let name = req.body.name
    let email = req.body.email
    let data = {
        name: name,
        email: email
    }
    User.findByIdAndUpdate({_id: req.params.id}, data, {new: true})
        .then((result) => {
            console.log(result)
            return res.status(200).json(result)
        })
        .catch((err) => {
            return res.status(400).json("Cannot update user")
        })
}

export function deleteUser(req, res) {
    User.findOneAndDelete({_id: req.params.id},)
        .then((result) => {
            console.log("result = ", result);
            return res.status(200).json(result);
        })
        .catch((err) => {
            return res.status(400).json("Cannot delete user")
        });
}



