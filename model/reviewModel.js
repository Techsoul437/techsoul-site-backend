import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    clientPhoto: {
      type: String,
      required: true,
    },
    review: {
      type: String,
      required: true,
    },
    project: {
      type: String,
      required: true,
    },
    position: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("review", reviewSchema);
