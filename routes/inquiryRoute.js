import express from 'express';
import { createInquiry, deleteInquiry, getAllInquiries } from '../controller/inquiryController.js';

const route = express.Router();

route.post('/create', createInquiry);        
route.post('/get', getAllInquiries);            
route.delete('/delete/:id', deleteInquiry);        

export default route;