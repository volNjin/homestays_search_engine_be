import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import morgan from "morgan";
import hotelsRoute from "./routes/homes.js";
import usersRoute from "./routes/users.js";
import authRoute from "./routes/auth.js";
import cookieParser from "cookie-parser";
import cors from "cors";

const app = express();
dotenv.config();
const mongoUrl = process.env.MONGO_URL || "mongodb://localhost:27017/combined_db";

const connect = async () => {
  try {
    // await mongoose.connect(process.env.MONGO);
    await mongoose
      .connect(mongoUrl, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
      .then(() => {
        console.log("Connected to MongoDB");
      })
      .catch((err) => {
        console.error("Failed to connect to MongoDB", err);
      });
    // Get a list of collections
    const collections = await mongoose.connection.db
      .listCollections()
      .toArray();

    collections.forEach(async (collection) => {
      const stats = await mongoose.connection.db
        .collection(collection.name)
        .stats();
      console.log(`Collection: ${collection.name}`);
      console.log(`Document Count: ${stats.count}`);
      console.log(`Storage Size: ${stats.storageSize}`);
      console.log(`Total Index Size: ${stats.totalIndexSize}`);
      console.log("--------------------------");
    });
  } catch (error) {
    throw error;
  }
};
app.use(cors()); // Enable cors
app.use(cookieParser());
app.use(express.json());

app.use("/hotels", hotelsRoute);
app.use("/user", usersRoute);
app.use("/auth", authRoute);
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
