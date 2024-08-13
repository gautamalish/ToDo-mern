import { Router } from "express";
import { GetLists, PostList } from "../controllers/list.controller.js";
const router = Router();

router.get("/", GetLists);
router.post("/add", PostList);
export default router;
