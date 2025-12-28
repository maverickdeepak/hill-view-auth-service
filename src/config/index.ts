import { config } from 'dotenv'
import path from 'node:path'

config({
    path: path.join(__dirname, `../../.env.${process.env.NODE_ENV}`),
})

const { PORT, NODE_ENV, DB_HOST, DB_PORT, DB_NAME, DB_USERNAME, DB_PASSWORD } =
    process.env
export const Config = {
    PORT: PORT || '5501',
    NODE_ENV,
    DB_HOST: DB_HOST || 'localhost',
    DB_PORT: DB_PORT || '5432',
    DB_NAME: DB_NAME || 'auth_service',
    DB_USERNAME: DB_USERNAME || 'postgres',
    DB_PASSWORD: DB_PASSWORD || 'postgres',
}
