import express from 'express';
import { createFaqDepartment, deleteFaqDepartment, getAllFaqDepartments, getFaqDepartmentById, updateFaqDepartment } from '../controller/faqDepartmentController.js';

const route = express.Router();

route.post('/create', createFaqDepartment);        
route.get('/get', getAllFaqDepartments);        
route.get('/get/:id', getFaqDepartmentById);        
route.put('/update/:id', updateFaqDepartment);        
route.delete('/delete/:id', deleteFaqDepartment);        

export default route;