import express, { NextFunction, Request, Response } from 'express'
import { AuthController } from '../controllers/AuthController'
import { UserService } from '../service/UserService'
import { AppDataSource } from '../config/data-source'
import { User } from '../entity/User'
import registerValidators from '../validators/register-validators'

// create router
const router = express.Router()

// create a user repository instance
const userRepository = AppDataSource.getRepository(User)

// create a service instance
const userService = new UserService(userRepository)

// create controller
const authController = new AuthController(userService)

router.post(
    '/register',
    registerValidators,
    (req: Request, res: Response, next: NextFunction) =>
        authController.register(req, res, next),
)

export default router
