import express from 'express';
import { createPortfolio, deletePortfolio, getAllPortfolios, getPortfolioById, updatePortfolio } from '../controller/portfolioController.js';

const route = express.Router();

route.post('/create', createPortfolio);        
route.post('/get', getAllPortfolios);        
route.get('/get/:id', getPortfolioById);        
route.put('/update/:id', updatePortfolio);        
route.delete('/delete/:id', deletePortfolio);        

export default route;