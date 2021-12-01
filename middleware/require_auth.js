import passport from "passport";

// const requireAuth = (req, res, next) => {
//      passport.authenticate('jwt', {session: false}, (err, passportUser, info) => {
//         if (err) {
//             return res
//                 .status(403)
//                 .send("Vous devez être administrateur pour accéder à cette ressource.");
//         }
//         if (info) {
//             return res
//                 .status(403)
//                 .send("Vous devez être administrateur pour accéder à cette ressource.");
//         }
//         next();
//
//     });
//
// }
const requireAuth = passport.authenticate("jwt", {session: false})

export default requireAuth