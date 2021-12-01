import express from "express";
import { login, logout } from "../controllers/auth.controller";
const router = express.Router();

// router.get("/", login);
router.post("/login", login);
router.get("/logout", logout);

export default router;
