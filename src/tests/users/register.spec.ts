import request from 'supertest'
import app from '../../app'
import { User } from '../../entity/User'
import { DataSource } from 'typeorm'
import { AppDataSource } from '../../config/data-source'
import { truncateTables } from '../utils'

describe('POST /auth/register', () => {
    let connection: DataSource

    beforeAll(async () => {
        connection = await AppDataSource.initialize()
    })

    beforeEach(async () => {
        // database truncation
        await truncateTables(connection)
    })

    afterAll(async () => {
        await connection.destroy()
    })

    describe('Happy path - given all fields', () => {
        it('should return 201', async () => {
            const userInfo = {
                firstName: 'Ben',
                lastName: 'Stokes',
                email: 'benstokes@hotmail.com',
                password: 'Heyben@77',
            }

            const response = await request(app)
                .post('/auth/register')
                .send(userInfo)
            expect(response.statusCode).toBe(201)
        })
        it('should return response in json format', async () => {
            const userInfo = {
                firstName: 'Ben',
                lastName: 'Stokes',
                email: 'benstokes@hotmail.com',
                password: 'Heyben@77',
            }

            const response = await request(app)
                .post('/auth/register')
                .send(userInfo)
            expect(response.headers['content-type']).toEqual(
                expect.stringContaining('json'),
            )
        })
        it('should persist user in database', async () => {
            const userInfo = {
                firstName: 'Ben',
                lastName: 'Stokes',
                email: 'benstokes@hotmail.com',
                password: 'Heyben@77',
            }

            await request(app).post('/auth/register').send(userInfo)
            const userRepository = connection.getRepository(User)
            const users = await userRepository.find()
            expect(users).toHaveLength(1)
            expect(users[0].firstName).toBe('Ben')
        })
    })
})
