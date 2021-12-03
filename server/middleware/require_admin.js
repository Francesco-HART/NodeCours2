 const requireAdmin = (req, res, next) => {
    if (req.user.userRole === "membre")
        return res
            .status(401)
            .send("Vous devez être administrateur pour accéder à cette ressource.");
    next();
};

export default requireAdmin