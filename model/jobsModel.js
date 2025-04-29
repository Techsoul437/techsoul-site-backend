import mongoose from "mongoose";

const jobSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    time: {
      type: String,
      required: true,
    },
    experience: {
      type: String,
      required: true,
    },
    opening: {
      type: Number,
      required: true,
    },
    datePosted: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

const Job = mongoose.model("Job", jobSchema);

export default Job;
