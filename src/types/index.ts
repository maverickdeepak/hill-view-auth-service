import type { Request } from 'express'

export interface UserData {
    firstName: string
    lastName: string
    email: string
    password: string
}

export interface RegisterUserRequestBody extends Request {
    body: UserData
}
