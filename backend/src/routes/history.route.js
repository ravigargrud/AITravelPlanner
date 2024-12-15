import { Router } from "express";
import { getHistory, addHistory, deleteHistory } from "../controllers/history.controller.js";
import { upload } from "../middlewares/multer.middleware.js";
import { verifyJWT } from '../middlewares/auth.middleware.js';

const router = Router();

router.route('/').get(verifyJWT, getHistory).post(verifyJWT, addHistory).delete(verifyJWT, deleteHistory);

export default router;