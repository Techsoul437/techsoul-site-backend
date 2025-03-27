import mongoose from 'mongoose';

const subscriberSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
},
{ collection: 'subscriber' }
);

export default mongoose.model('subscriber', subscriberSchema);