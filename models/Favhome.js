import mongoose from "mongoose";
const FavhomeSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    homename: {
      type: String,
      required: true,
    },
    homephoto: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Favhome", FavhomeSchema, "favhomes");
