import type { Response } from 'express'
import { RegisterUserRequestBody } from '../types'
import { UserService } from '../service/UserService'

export class AuthController {
    constructor(private userService: UserService) {}

    async register(req: RegisterUserRequestBody, res: Response) {
        const { firstName, lastName, email, password } = req.body
        await this.userService.create({ firstName, lastName, email, password })
        res.status(201).json({ message: 'User created successfully' })
    }
}
