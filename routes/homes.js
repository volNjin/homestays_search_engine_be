import express from "express";
import { getHomeById, getHomes, getHomeByName } from "../controllers/home.js";

const router = express.Router();
//GET

router.get("/find/:id", getHomeById);
router.get("/findByName/:homename", getHomeByName);

//GET ALL
router.get("/", getHomes);

// module.exports = router;

export default router;