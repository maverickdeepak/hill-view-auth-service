import { checkSchema } from 'express-validator'

export default checkSchema({
    firstName: {
        isLength: {
            options: { min: 2 },
            errorMessage: 'First name should be at least 2 chars',
        },
    },
    email: {
        normalizeEmail: true,
        trim: true,
        errorMessage: 'Email is required',
        isEmail: true,
        notEmpty: true,
    },
    password: {
        isLength: {
            options: { min: 8 },
            errorMessage: 'Password should be at least 8 chars',
        },
    },
})
