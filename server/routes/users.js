import express from "express";

import {
  getUsers,
  addUser,
  findUser,
  deleteUser,
  updateUser,
  userAuth,
} from "../controllers/users.js";

import auth from "../middleware/auth.js";

const router = express.Router();

router.get("/", getUsers);
router.get("/:id", auth, findUser);
router.post("/", addUser);
router.patch("/:id", updateUser);
router.delete("/:id", deleteUser);

export default router;
