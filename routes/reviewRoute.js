import express from 'express';
import { createReview, deleteReview, getAllReviews, getReviewById, updateReview } from '../controller/reviewController.js';

const route = express.Router();

route.post('/create', createReview);        
route.post('/get', getAllReviews);        
route.get('/get/:id', getReviewById);        
route.put('/update/:id', updateReview);        
route.delete('/delete/:id', deleteReview);        

export default route;