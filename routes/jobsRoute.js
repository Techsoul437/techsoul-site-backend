import express from 'express';
import { createJob, deleteJob, getAllJobs, getJobById, updateJob } from '../controller/jobsController.js';

const route = express.Router();

route.post('/create', createJob);        
route.get('/get', getAllJobs);        
route.get('/get/:id', getJobById);        
route.put('/update/:id', updateJob);        
route.delete('/delete/:id', deleteJob);        

export default route;