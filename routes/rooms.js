import express from "express";
import { getRoom, getRooms} from "../controllers/room.js";

const router = express.Router();
//GET
router.get("/:id", getRoom);
//GET ALL
router.get("/", getRooms);

export default router;
