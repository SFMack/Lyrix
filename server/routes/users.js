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

router.get("/", auth, getUsers);
router.get("/:id", auth, findUser);
router.post("/", addUser);
router.patch("/:id", auth, updateUser);
router.delete("/:id", auth, deleteUser);

router.post("/login", userAuth);

export default router;
