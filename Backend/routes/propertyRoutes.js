import express from 'express';
import {createProperty, deleteProperty, updateProperty} from '../controllers/propertyController.js';
import { upload } from '../controllers/propertyController.js';

const router = express.Router();

router.post('/', upload, createProperty);
router.delete('/:id', deleteProperty);
router.put('/:id', updateProperty);
export default router;
