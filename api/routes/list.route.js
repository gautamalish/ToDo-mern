import { Router } from "express";
import { GetLists } from "../controllers/list.controller.js";
const router = Router();

router.get("/", GetLists);

export default router;
