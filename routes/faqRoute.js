import express from 'express';
import { createFaq, deleteFaq, getAllFaqs, getFaqById, updateFaq } from '../controller/faqController.js';

const route = express.Router();

route.post('/create', createFaq);        
route.post('/get', getAllFaqs);        
route.get('/get/:id', getFaqById);        
route.put('/update/:id', updateFaq);        
route.delete('/delete/:id', deleteFaq);        

export default route;