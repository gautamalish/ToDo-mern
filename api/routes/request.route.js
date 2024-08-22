import { requestFunc } from "../controllers/request.controller";
import { Router } from "express";
const router = Router();

router.post("/google-auth", requestFunc);
export default router;
