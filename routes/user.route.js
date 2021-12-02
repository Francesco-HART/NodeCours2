import {
  create,
  deleteUser,
  getUser,
  updateUser,
} from "../controllers/user.controller";
import express from "express";
import require_admin from "../middleware/require_admin";
const router = express.Router();

router.post("/user", create);
router.get("/user/:id", require_admin, getUser);
router.put("/user/:id", updateUser);
router.delete("/user/:id", require_admin, deleteUser);

export default router;
