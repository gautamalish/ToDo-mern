import { Router } from "express";
import {
  CreateUser,
  loginUser,
  logout,
} from "../controllers/user.controller.js";
const router = Router();

router.post("/signup", CreateUser);
router.post("/signin", loginUser);
router.get("/logout", logout);
export default router;
