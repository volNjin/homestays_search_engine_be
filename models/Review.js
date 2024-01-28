import mongoose from "mongoose";
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
  review_date: {
    type: String,
    required: true,
  },
  review_score: {
    type: String,
  },
  images: {
    type: [String],
  },
  review_content: {
    type: String,
    required: true,
  },
  label: {
    type: String,
  },
  sentiment: {
    type: String,
  },
});

export default ReviewSchema;
