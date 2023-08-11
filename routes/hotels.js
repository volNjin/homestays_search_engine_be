import express from "express";
import { getHotel, getHotels, countByCity, getHotelRooms } from "../controllers/hotel.js";

const router = express.Router();
//GET

router.get("/find/:id", getHotel);

//GET ALL

router.get("/", getHotels);
router.get("/countByCity", countByCity);
router.get("/room/:id", getHotelRooms);



// module.exports = router;

export default router;