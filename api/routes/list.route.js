import { Router } from "express";
import {
  DeleteList,
  GetLists,
  getSingleTodo,
  PostList,
  UpdateList,
} from "../controllers/list.controller.js";
const router = Router();

router.get("/", GetLists);
router.get("/get-one/:id", getSingleTodo);
router.post("/create", PostList);
router.delete("/delete/:id", DeleteList);
router.patch("/update/:id", UpdateList);
export default router;
