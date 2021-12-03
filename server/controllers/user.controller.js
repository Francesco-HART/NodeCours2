import bcrypt from "bcrypt";
import { User, schema } from "../entities/user";

/**
 * Function used to create a user
 * @param req
 * @param res
 * @returns {*}
 */
export function create(req, res) {
  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }
  let name = "";
  let password = req.body.password;
  let confirm_password = req.body.confirm_password;

  let email = req.body.email;
  let userRole = "member";

  if (password !== confirm_password)
    return res.status(400).send("Mot de passe et sa confirmation incorrect");

  if (password !== null || email !== null) {
    const hash = bcrypt.hashSync(password, 10);
    const user = new User({
      name: name,
      email: email,
      password: hash,
      userRole: userRole,
    });

    user
      .save()
      .then((user) => {
        user = user.set("password", undefined, { strict: false });
        res.status(201).json({
          user,
        });
      })
      .catch((error) => {
        res.status(400).json({
          error: error,
        });
      });
  } else {
    return res.statusCode(400).json({ message: "Champs manquant(s)" });
  }
}

/**
 * Function used to register a user
 * @param req
 * @param res
 * @returns {*}
 */
export function register(req, res) {
  // const { error } = schema.validate(req.body);
  // if (error) {
  //   return res.status(400).send(error.details[0].message);
  // }

  let confirm_password = req.body.confirm_password;
  let name = "";
  let password = req.body.password;
  let email = req.body.email;
  let userRole = "member";

  if (password !== confirm_password)
    return res.status(400).send("Mot de passe et sa confirmation incorrect");

  if (password !== null || email !== null) {
    const hash = bcrypt.hashSync(password, 10);
    const user = new User({
      name: name,
      email: email,
      password: hash,
      userRole: userRole,
    });

    user
      .save()
      .then((user) => {
        user = user.set("password", undefined, { strict: false });
        res.status(201).json({
          user,
        });
      })
      .catch((error) => {
        res.status(400).json({
          error: error,
        });
      });
  } else {
    return res.statusCode(400).json({ message: "Champs manquant(s)" });
  }
}

/**
 * Function used to get a user
 * @param req
 * @param res
 */
export function getUser(req, res) {
  User.findById(req.params.id)
    .select("-password")
    .then((user) => {
      return res.status(200).json(user);
    })
    .catch((err) => {
      return res.status(400).json("Cannot find user");
    });
}

/**
 * Function used to update a user
 * @param req
 * @param res
 */
export function updateUser(req, res) {
  let name = req.body.name;
  let email = req.body.email;
  let data = {
    name: name,
    email: email,
  };

  User.findByIdAndUpdate({ _id: req.params.id }, data, { new: true })
    .select("-password")
    .then((result) => {
      return res.status(200).json(result);
    })
    .catch((err) => {
      return res.status(400).json("Cannot update user");
    });
}

/**
 * Function used to delete a user
 * @param req
 * @param res
 */
export function deleteUser(req, res) {
  User.findOneAndDelete({ _id: req.params.id })
    .select("-password")
    .then((result) => {
      return res.status(200).json(result);
    })
    .catch((err) => {
      return res.status(400).json("Cannot delete user");
    });
}

/**
 * function used to get current user
 * @param req
 * @param res
 * @returns {Promise<*>}
 */
export async function currentUser(req, res) {
  const user = await User.findById(req.user._id);
  return res.status(200).json(user);
}

/**
 * function used to update password
 * @param req
 * @param res
 * @returns {Promise<*>}
 */
export async function updatePassword(req, res) {
  try {
    const randomstring = Math.random().toString(36).slice(-8);
    await User.findOneAndUpdate(
      { _id: req.user._id },
      { password: randomstring }
    );
    MediaList.send(randomstring, req.user.email);
    return res.status(200).json();
  } catch {
    return res.status(500).send();
  }
}
