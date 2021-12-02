 const requireAdmin = (req, res, next) => {
    if (req.user === "membre")
        return res
            .status(403)
            .send("Vous devez être administrateur pour accéder à cette ressource.");
    next();
};

export default requireAdmin