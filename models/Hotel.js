import mongoose from "mongoose";
const HotelSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  province: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  cheapest_price: {
    type: String,
    required: true,
  },
  score: {
    type: String,
  },
  review: {
    type: String,
  },
  map: {
    lat: {
      type: String,
      required: true,
    },
    lon: {
      type: String,
      required: true,
    }
  },
  img_urls: {
    type: [String],
  },
  description: {
    type: String,
    required: true,
  },
  facility_highlights: {
    type: [String],
  },
  top_features: {
    type: [String],
  },
});

export default mongoose.model("Hotel", HotelSchema, 'homes');