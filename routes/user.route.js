import {
  create,
  deleteUser,
  getUser,
  updateUser,
  currentUser
} from "../controllers/user.controller";
import express from "express";
import require_auth from "../middleware/require_auth";
const router = express.Router();

router.post("/user", create);
router.get("/user/:id", getUser);
router.put("/user/:id", updateUser);
router.delete("/user/:id", deleteUser);
router.get("/currentuser",require_auth,currentUser)
export default router;
