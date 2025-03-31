import express from 'express';
import { createPortfolio, createPortfolioSection, deletePortfolio, deletePortfolioSection, getAllPortfolios, getAllPortfolioSection, getPortfolioById, getPortfolioSectionById, updatePortfolio, updatePortfolioSection } from '../controller/portfolioController.js';

const route = express.Router();

route.post('/create', createPortfolio);        
route.post('/get', getAllPortfolios);        
route.get('/get/:id', getPortfolioById);        
route.put('/update/:id', updatePortfolio);        
route.delete('/delete/:id', deletePortfolio);      

route.post('/create-section', createPortfolioSection);        
route.get('/get-section', getAllPortfolioSection);        
route.get('/get-section/:id', getPortfolioSectionById);        
route.put('/update-section/:id', updatePortfolioSection);        
route.delete('/delete-section/:id', deletePortfolioSection);        

export default route;