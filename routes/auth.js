import express from "express";
import { signin, signup } from "../controllers/auth.js";
import checkDuplicateEmail from "../middlewares/verifySignup.js";
const router = express.Router();

router.post("/signup", [checkDuplicateEmail], signup);

router.post("/signin", signin);

export default router;
