import type { NextFunction, Request, Response } from 'express'
import express from 'express'
import { HttpError } from 'http-errors'
import logger from './config/logger'
import authRouter from './routes/auth'

const app = express()

app.get('/', async (req: Request, res: Response, _next: NextFunction) => {
    res.send('Welcome to auth service')
})

// register routes
app.use('/auth', authRouter)

// global middleware for error handling
app.use(
    (error: HttpError, req: Request, res: Response, _next: NextFunction) => {
        logger.error(error.message)
        const statusCode = error.statusCode || 500
        res.status(statusCode).json({
            errors: [
                {
                    type: error.name,
                    message: error.message,
                    path: error.path || '/',
                    location: '',
                },
            ],
        })
    },
)

export default app
