import { Router } from "express";
import { CreateUser } from "../controllers/user.controller.js";
const router = Router();

router.post("/signup", CreateUser);
export default router;
