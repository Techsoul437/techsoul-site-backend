import express from 'express';
import { signIn } from '../controller/adminController.js';

const route = express.Router();

route.post('/signin', signIn);        

export default route;