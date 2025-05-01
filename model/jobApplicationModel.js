import mongoose from "mongoose";

const jobApplicationSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    mobileNumber: {
      type: String,
      required: true,
    },
    resumeFile: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      enum: ["Male", "Female", "Others"],
      required: true,
    },
    totalExperience: {
      type: String,
      enum: [
        "Fresher",
        "1-2 Years",
        "3-4 Years",
        "5-6 Years",
        "7-8 Years",
        "9-10 Years",
        "11-12 Years",
        "13-14 Years",
        "Over 15 Years",
      ],
    },
    currentLocation: {
      type: String,
      required: true,
    },
    noticePeriod: {
      type: String,
      enum: [
        "15 Days",
        "30 Days",
        "45 Days",
        "60 Days",
        "75 Days",
        "90 Days",
        "More than 90 Days",
      ],
    },
    sourceOfReferral: {
      type: String,
      enum: ["Linkedin", "Facebook", "Instagram", "Twitter", "Other"],
      required: true,
    },
    jobRole: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("JobApplication", jobApplicationSchema);
