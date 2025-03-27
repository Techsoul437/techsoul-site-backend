import express from 'express';
import { createJobApplication, deleteJobApplication, downloadResume, getAllJobApplication } from '../controller/jobApplicationController.js';


const router = express.Router();

router.post('/create', createJobApplication);
router.get('/get', getAllJobApplication);
router.get('/download/:id', downloadResume);
router.delete('/delete/:id', deleteJobApplication);

export default router;
