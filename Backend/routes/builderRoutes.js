import express from 'express'
import { createBuilder } from '../controllers/builderController.js'

const router = express.Router()

router.post('/', createBuilder)

export default router