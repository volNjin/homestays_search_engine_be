import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import morgan from "morgan";
import hotelsRoute from "./routes/homes.js";
import roomsRoute from "./routes/rooms.js";
import cookieParser from "cookie-parser";
import cors from "cors";

const app = express();
dotenv.config();

const connect = async () => {
  try {
    // await mongoose.connect(process.env.MONGO);
    await mongoose.connect("mongodb://localhost:27017/combined_db");
  } catch (error) {
    throw error;
  }
};
app.use(cors()); // Enable cors
app.use(cookieParser());
app.use(express.json());

app.use("/api/hotels", hotelsRoute);
app.use("/api/rooms", roomsRoute);

mongoose.connection.on("disconnected", () => {
  console.log("mongoDB disconnected!");
});

mongoose.connection.on("connected", () => {
  console.log("mongoDB connected!");
});

app.get("/", (req, res) => {
  res.send("hello first request!");
});

app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms")
);
const PORT = 8800;
app.listen(PORT, () => {
  connect();
  console.log(`Server is running on http://localhost:${PORT}`);
});
