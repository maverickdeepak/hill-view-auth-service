import { checkSchema } from 'express-validator'

export default checkSchema({
    firstName: {
        isLength: {
            options: { min: 3 },
            errorMessage: 'First name should be at least 3 chars',
        },
    },
    email: {
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
