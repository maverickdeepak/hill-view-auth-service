import { body } from 'express-validator'

export default [
    body('email').notEmpty(),
    body('password').notEmpty(),
    body('firstName').notEmpty(),
]
