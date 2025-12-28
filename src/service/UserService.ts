import { User } from '../entity/User'
import { Repository } from 'typeorm'
import { UserData } from '../types'
import createHttpError from 'http-errors'

export class UserService {
    constructor(private userRepository: Repository<User>) {}

    async create({ firstName, lastName, email, password }: UserData) {
        try {
            return this.userRepository.save({
                firstName,
                lastName,
                email,
                password,
            })
        } catch (error) {
            throw createHttpError(500, 'Error creating user' + error)
        }
    }
}
