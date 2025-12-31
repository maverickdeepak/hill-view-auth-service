import type { NextFunction, Response } from 'express'
import { RegisterUserRequestBody } from '../types'
import { UserService } from '../service/UserService'
import Logger from '../config/logger'
import createHttpError from 'http-errors'
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
            const err = createHttpError(400, 'Email is required')
            next(err)
            return
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
