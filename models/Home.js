import mongoose from "mongoose";
const RoomSchema = new mongoose.Schema({
  homename: String,
  roomtype: String,
  photos: [String],
  facilities: [String],
  availables: [
    {
      occupancy: Number,
      price: String,
    },
  ],
});
const ReviewSchema = new mongoose.Schema({
  homename: {
    type: String,
    required: true,
  },
  user_name: {
    type: String,
    required: true,
  },
  user_country: {
    type: String,
    required: true,
  },
  review_score: {
    type: String,
    required: true,
  },
  review_title: {
    type: String,
    required: false,
  },
  review_content: {
    type: String,
    required: false,
  },
  review_date: {
    type: String,
    required: true,
  },
  label: {
    type: String,
    required: false,
  },
  sentiment: {
    type: String,
    required: false,
  },
});
const HomeSchema = new mongoose.Schema({
  homename: {
    type: String,
    required: true,
  },
  city: {
    vn: {
      type: String,
      required: true,
    },
    en: {
      type: String,
      required: true,
    },
  },
  address: {
    type: String,
    required: true,
  },
  cheapest_prices: {
    agoda: String,
    booking: String,
    traveloka: String,
  },
  ratings: {
    agoda: String,
    booking: String,
    traveloka: String,
  },
  images: {
    type: [String],
  },
  description: {
    type: String,
    required: true,
  },
  property_highlights: {
    type: [String],
  },
  rooms: {
    agoda: [RoomSchema],
    booking: [RoomSchema],
    traveloka: [RoomSchema],
  },
  reviews: {
    agoda: [ReviewSchema],
    booking: [ReviewSchema],
    traveloka: [ReviewSchema],
  },
});

export default mongoose.model("Home", HomeSchema, "homes");
