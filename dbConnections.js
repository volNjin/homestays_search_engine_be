import mongoose from "mongoose";
export const agodaDB = mongoose.createConnection(
  "mongodb://localhost:27017/agoda_homestays",
  { useNewUrlParser: true, useUnifiedTopology: true }
);
export const bookingDB = mongoose.createConnection(
  "mongodb://localhost:27017/booking_homestays",
  { useNewUrlParser: true, useUnifiedTopology: true }
);
export const travelokaDB = mongoose.createConnection(
  "mongodb://localhost:27017/traveloka_homestays",
  { useNewUrlParser: true, useUnifiedTopology: true }
);

