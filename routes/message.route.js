import {
  create,
} from "../controllers/message.controller";
import express from "express";
import authCheck from "../middleware/require_auth";
import adminAuth from "../middleware/require_admin";
const router = express.Router();

router.post("/message", authCheck, create);

export default router;
