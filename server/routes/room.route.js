import {
    create,
    getRoom,
    getDefaultRoom
} from "../controllers/room.controller";
import express from "express";
import require_auth from "../middleware/require_auth";

const router = express.Router();

router.post("/room", require_auth, create);
router.get("/room/:id", require_auth, getRoom);
router.get("/default-room", require_auth, getDefaultRoom)
export default router;
