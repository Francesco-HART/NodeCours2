import {
  create,
  deleteUser,
  getUser,
  updateUser,
} from "../controllers/user.controller";
import express from "express";
const router = express.Router();

router.post("/", create);
router.get("/:id", getUser);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);

export default router;
