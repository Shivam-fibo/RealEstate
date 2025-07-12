import express from 'express';
import {createProperty} from '../controllers/propertyController.js';
import { upload } from '../controllers/propertyController.js';

const router = express.Router();

router.post('/', upload, createProperty);

export default router;
