import express from 'express';
import { createInquiry, deleteInquiry, getAllInquiries, updateInquiry } from '../controller/inquiryController.js';

const route = express.Router();

route.post('/create', createInquiry);        
route.post('/get', getAllInquiries);            
route.delete('/delete/:id', deleteInquiry);        
route.patch('/update/:id', updateInquiry);        

export default route;