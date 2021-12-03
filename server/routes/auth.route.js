import express from "express";
import { login, logout } from "../controllers/auth.controller";
import { updatePassword } from "../controllers/user.controller";
const router = express.Router();
import authCheck from "../middleware/require_auth";
import { send } from "../services/mail";

/**
 * Routes of authentification
 */
router.post("/login", login);
router.get("/logout", authCheck, logout);
router.get("/updatepassword", updatePassword);

export default router;
