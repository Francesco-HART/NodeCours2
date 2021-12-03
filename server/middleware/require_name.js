import { User } from "../entities/user";

/**
 * Restriction who require a name
 * @param req
 * @param res
 * @param next
 * @returns {Promise<*>}
 */
const requireName = async (req, res, next) => {
  const user = await User.findById(req.user._id);
  if (user.name === "")
    return res
      .status(403)
      .send("Vous devez avoir un nom pour envoyer des messages.");
  next();
};

export default requireName;
