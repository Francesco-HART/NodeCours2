import passportLocal from "passport-local"
import passport from "passport";
import {User} from "../entities/user";
import bcrypt from "bcrypt";
import Cookies from "cookies";
import jwt from 'jsonwebtoken';
import passportJwt from "passport-jwt"

const cookieKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6Imp3dCJ9.eyJ1c2VybmFtZSI6IkFub255bWUiLCJyb2xlIjoiVXNlciJ9._qpO3Uagw4kt8SbDWBy2AC7sF8H_dqF6r8I9eqK7Dtc";
const jwtKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6Imp3dCJ9.eyJ1c2VybmFtZSI6IkFub255bWUiLCJyb2xlIjoiVXNlciJ9._qpO3Uagw4kt8SbDWBy2AC7sF8H_dqF6r8I9eqK7Dtc";

const JwtStrategy = passportJwt.Strategy;
const ExtractJwt = passportJwt.ExtractJwt;

const LocalStrategy = passportLocal.Strategy;

const localLogin = new LocalStrategy(
    {usernameField: "email"}, async (email, password, done) => {
        const user = await User.findOne({email: email});
        if (email !== user.email) {
            return done(null, false, {"error": "email incorrect"})
        }
        await bcrypt.compare(password, user.password, (err, match) => {
            if (err) {
                return done(null, false, {"error": "email incorrect"})
            } else if (!match) {
                return done(null, false, {"error": "email incorrect"})
            } else {
                return done(null, email)
            }
        })
    }
)

const signIn = (req, res, next) => {
    passport.authenticate("local", {session: false}, (err, email, infos) => {
        if (err) {
            return res.status(500).json(infos);
        } else if (!email) {
            return res.status(500).json(infos);
        } else {
            const timestamp = new Date().getTime() / 1000;
            const token_infos = {email};
            // ADD TYPE
            // const token_infos = email;
            const token = jwt.sign(
                {sub: token_infos, iat: timestamp},
                jwtKey,
                {expiresIn: "12h"}
            );
            new Cookies(req, res, {keys: [cookieKey]}).set("jwt", token, {
                maxAge: 12 * 60 * 60 * 1000, // 12h
                signed: true,
                overwrite: true,
            });
            res.status(200).send(email);
        }
    })(req, res, next);
}

const cookieExtractor = function (req) {
    let token = null;
    //TODO: look for cookie extractor
    const jwt = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJzYXJhYWh5dEBnbWFpbC5jb20iLCJpYXQiOjE2MzgzNjg0NjguMzEzLCJleHAiOjE2Mzg0MTE2Njh9.ENVEm3lxmOOCOfYVMdWLKdUoCmL-UA7S_GmZbup2H2k"
    if (req && req.headers.cookie && jwt)
        token = jwt;

    console.log('TOKEN = ', token)
    return token;
};

const jwtOptions = {
    jwtFromRequest: ExtractJwt.fromExtractors([
        cookieExtractor,
        ExtractJwt.fromAuthHeaderAsBearerToken(),
    ]),
    secretOrKey: jwtKey,
};

const jwtLogin = new JwtStrategy(jwtOptions, function (payload, done) {
    if (payload.sub) {
        done(null, payload.sub)
    }
    else {
        done(null, false);
    }
});

const signOut = (req, res) => {
    new Cookies(req, res, {keys: [cookieKey]}).set("jwt");

    res.redirect("/");
};

export {
    signIn,
    signOut,
    jwtLogin,
    localLogin
}
