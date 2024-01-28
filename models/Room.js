import mongoose from "mongoose";
const Available = new mongoose.Schema({
  occupancy: {
    type: String,
  },
  price: {
    type: String,
  },
});
const RoomSchema = new mongoose.Schema({
  homename: {
    type: String,
    required: true,
  },
  roomtype: {
    type: String,
    required: true,
  },
  facilities: {
    type: [String],
  },
  availables: {
    type: [Available],
  },
});

export default RoomSchema;
