import mongoose from "mongoose";
const RoomSchema = new mongoose.Schema(
  {
    home_name: {
      type: String,
      required: true,
    },
    room_name: {
      type: String,
      required: true,
    },
    price: {
      type: String,
      required: true,
    },
    adult:{
      type: Number,
      required: true,
    },
    child:{
      type: Number,
      required: true,
    },
    photos: {
      type: [String],
    },
    highlights: {
      type: [String],
    },
  },
);

export default mongoose.model("Room", RoomSchema, 'rooms');
