import { User } from '../entity/User'
import { Repository } from 'typeorm'
import { UserData } from '../types'
import createHttpError from 'http-errors'
import { Roles } from '../constants'
import bcrypt from 'bcrypt'

export class UserService {
    constructor(private userRepository: Repository<User>) {}

    async create({ firstName, lastName, email, password }: UserData) {
        // check if a user already exists
        const isEmailAlreadyExist = await this.userRepository.findOne({
            where: { email },
        })

        if (isEmailAlreadyExist) {
            throw createHttpError(400, 'Email already exists')
        }

        // hash password
        const hashedPassword = await bcrypt.hash(password, 10)
        try {
            return this.userRepository.save({
                firstName,
                lastName,
                email,
                password: hashedPassword,
                role: Roles.CUSTOMER,
            })
        } catch (error) {
            throw createHttpError(500, 'Error creating user' + error)
        }
    }
}
