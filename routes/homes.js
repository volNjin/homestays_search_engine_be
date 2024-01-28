import express from "express";
import { getHome, getHomes, countByCity } from "../controllers/home.js";

const router = express.Router();
//GET

router.get("/find/:id", getHome);

//GET ALL

router.get("/", getHomes);
router.get("/countByCity", countByCity);




// module.exports = router;

export default router;