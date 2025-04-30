import express from 'express';
import { chatWithBot, getChatHistoryController } from '../controller/chatbotController.js';

const router = express.Router();

router.post('/chat', chatWithBot);
router.get('/history', getChatHistoryController);

export default router;
