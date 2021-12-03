import passport from "passport";

/**
 * Restriction to authenticate users
 */
const requireAuth = passport.authenticate("jwt", {session: false})

export default requireAuth