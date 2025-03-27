import mongoose from 'mongoose';

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
    position: {
      type: String,
      required: true,
    },
    resumeFile: {
      type: String, 
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model('JobApplication', jobApplicationSchema);