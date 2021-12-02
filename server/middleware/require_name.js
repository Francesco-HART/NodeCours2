 const requireName = (req, res, next) => {
    if (req.user.name === "")
        return res
            .status(403)
            .send("Vous devez avoir un nom pour envoyer des messages.");
    next();
};

export default requireName