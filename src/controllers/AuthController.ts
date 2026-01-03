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
            const access_token = 'access_token='
            const refresh_token = 'refresh_token='

            res.cookie('access_token', access_token, {
                domain: 'localhost',
                httpOnly: true,
                maxAge: 1000 * 60 * 60 * 24, // 1 day
                sameSite: 'strict',
            })

            res.cookie('refresh_token', refresh_token, {
                domain: 'localhost',
                httpOnly: true,
                maxAge: 1000 * 60 * 60 * 24 * 365, // 1 day
                sameSite: 'strict',
            })

            res.status(201).json({
                message: 'User created successfully',
            })
        } catch (error) {
            next(error)
            return
        }
    }
}
