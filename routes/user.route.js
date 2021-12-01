import {
  create,
  deleteUser,
  getUser,
  updateUser,
} from "../controllers/user.controller";
import express from "express";
const router = express.Router();

router.post("/user", create);
router.get("/user/:id", getUser);
router.put("/user/:id", updateUser);
router.delete("/user/:id", deleteUser);

export default router;
