import express from "express";
import {
  getMyProfile,
  addFavhome,
  getFavhomes,
  removeFavhome,
} from "../controllers/user.js";
import verifyToken from "../middlewares/authJWT.js";
const router = express.Router();

router.get("/me", [verifyToken], getMyProfile);
router.post("/favhome", [verifyToken], addFavhome);
router.get("/favhomes", [verifyToken], getFavhomes);
router.delete("/favhome", [verifyToken], removeFavhome);

export default router;
