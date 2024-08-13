import { Router } from "express";
import {
  DeleteList,
  GetLists,
  PostList,
  UpdateList,
} from "../controllers/list.controller.js";
const router = Router();

router.get("/", GetLists);
router.post("/add", PostList);
router.delete("/delete/:id", DeleteList);
router.patch("/update/:id", UpdateList);
export default router;
