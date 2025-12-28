import express from 'express'
import { AuthController } from '../controllers/Controller'

// create router
const router = express.Router()

// create controller
const authController = new AuthController()

router.post('/register', (req, res) => authController.register(req, res))

export default router
