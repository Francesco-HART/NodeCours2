import express from "express";
import { login, logout } from "../controllers/auth.controller";
const router = express.Router();
import authCheck from "../middleware/require_auth";

// router.get("/", login);
router.post("/login", login);
router.get("/logout", authCheck, logout);

export default router;
