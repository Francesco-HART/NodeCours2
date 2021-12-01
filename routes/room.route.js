import {
  create,
  getRoom
} from "../controllers/room.controller";
import express from "express";
const router = express.Router();

router.post("/room", create);
router.get("/room/:id", getRoom);

export default router;
