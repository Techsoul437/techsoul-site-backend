import express from 'express';
import { createBlog, deleteBlog, getAllBlogs, getBlogById, updateBlog } from '../controller/blogController.js';

const route = express.Router();

route.post('/create', createBlog);        
route.post('/get', getAllBlogs);        
route.get('/get/:id', getBlogById);        
route.put('/update/:id', updateBlog);        
route.delete('/delete/:id', deleteBlog);        

export default route;