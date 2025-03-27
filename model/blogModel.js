import mongoose from 'mongoose';

const blogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    blogPhoto: {
        type: String, 
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    authorPhoto: {
        type: String, 
        required: true,
    },
    authorName: {
        type: String,
        required: true,
    },
    authorPosition: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        required: true,
    },
});

export default mongoose.model('Blog', blogSchema);
