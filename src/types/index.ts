import type { Request } from 'express'

interface User {
    firstName: string
    lastName: string
    email: string
    password: string
}

export interface RegisterUserRequestBody extends Request {
    body: User
}
