 const requireAdmin = (req, res, next) => {
    // look the type
     console.log("req ", req)
    if (req.user === "membre")
        return res
            .status(403)
            .send("Vous devez être administrateur pour accéder à cette ressource.");
    next();
};

export default requireAdmin