import type { Response } from 'express'
import { AppDataSource } from '../config/data-source'
import { User } from '../entity/User'
import { RegisterUserRequestBody } from '../types'

export class AuthController {
    async register(req: RegisterUserRequestBody, res: Response) {
        const { firstName, lastName, email, password } = req.body
        const userRepository = AppDataSource.getRepository(User)
        await userRepository.save({
            firstName,
            lastName,
            email,
            password,
        })

        res.status(201).json({ message: 'User created successfully' })
    }
}
