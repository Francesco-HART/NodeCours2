/**
 * Restriction to Admin role
 * @param req
 * @param res
 * @param next
 * @returns {*}
 */
 const requireAdmin = (req, res, next) => {
    if (req.user.userRole === "membre")
        return res
            .status(401)
            .send("Vous devez être administrateur pour accéder à cette ressource.");
    next();
};

export default requireAdmin