import type { NextFunction, Response } from 'express'
import { RegisterUserRequestBody } from '../types'
import { UserService } from '../service/UserService'
import Logger from '../config/logger'
import { validationResult } from 'express-validator'

export class AuthController {
    constructor(
        private userService: UserService,
        private logger = Logger,
    ) {}

    async register(
        req: RegisterUserRequestBody,
        res: Response,
        next: NextFunction,
    ) {
        const errors = validationResult(req)

        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })
        }

        const { firstName, lastName, email, password } = req.body

        try {
            const user = await this.userService.create({
                firstName,
                lastName,
                email,
                password,
            })

            this.logger.info('User created successfully ', { id: user.id })

            res.status(201).json({
                message: 'User created successfully',
            })
        } catch (error) {
            next(error)
            return
        }
    }
}
