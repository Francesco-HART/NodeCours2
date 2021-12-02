import {
  create,
} from "../controllers/message.controller";
import express from "express";
import authCheck from "../middleware/require_auth";
import requireName from "../middleware/require_name";
const router = express.Router();

router.post("/message", authCheck, requireName, create);

export default router;
