import { Route, Router } from "express";
import { CreateUser } from "../controllers/user.controller";
const router = Router();

router.post("/", CreateUser);
export default router;
