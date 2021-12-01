module.exports = (req, res, next) => {
    // look the type
    if (req.user === "membre")
        return res
            .status(403)
            .send("Vous devez être administrateur pour accéder à cette ressource.");
    next();
};