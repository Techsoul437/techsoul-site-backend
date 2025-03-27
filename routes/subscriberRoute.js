import express from 'express';
import { getAllSubscriber, subscribe } from '../controller/subscriberController.js';


const router = express.Router();

router.post('/create', subscribe);
router.get('/get', getAllSubscriber);

export default router;