import mongoose from "mongoose";
const commentSchma = new mongoose.Schema({
  score: {
    type: String,
    required: true,
  },
  scoreText: {
    type: String,
    required: true,
  },
  reviewer_name: {
    type: String,
    required: true,
  },
  reviewer_country: {
    type: String,
    required: true,
  },
  room_type: {
    type: String,
    required: true,
  },
  stay_detail: {
    type: String,
    required: true,
  },
  comment_title: {
    type: String,
    required: true,
  },
  comment_text: {
    type: String,
    required: true,
  },
  review_date: {
    type: String,
    required: true,
  },
})
const featureSchma = new mongoose.Schema({
  img: {
    type: String,
  },
  content: {
    type: String,
  }
})
const HotelSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  address: {
    vn: {
      type: String,
      required: true,
    },
    en: {
      type: String,
      required: true,
    },
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
    type: [featureSchma],
  },
  comments: {
    type: [commentSchma],
  },
});

export default mongoose.model("Hotel", HotelSchema, 'homes');