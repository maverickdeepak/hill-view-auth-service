import request from 'supertest'
import app from '../../app'
import { User } from '../../entity/User'
import { DataSource } from 'typeorm'
import { AppDataSource } from '../../config/data-source'
// import { truncateTables } from '../utils'

describe('POST /auth/register', () => {
    let connection: DataSource

    beforeAll(async () => {
        connection = await AppDataSource.initialize()
    })

    beforeEach(async () => {
        await connection.dropDatabase()
        await connection.synchronize()
        // await truncateTables(connection)
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
        it('should return the ID of the created user in the response body', async () => {
            const userInfo = {
                firstName: 'Ben',
                lastName: 'Stokes',
                email: 'benstokes@hotmail.com',
                password: 'Heyben@77',
            }

            await request(app).post('/auth/register').send(userInfo)
            const userRepository = connection.getRepository(User)
            const users = await userRepository.find()
            expect(users[0].id).toBeDefined()
        })
        it('should assign default role to the user as customer', async () => {
            const userInfo = {
                firstName: 'Ben',
                lastName: 'Stokes',
                email: 'benstokes@hotmail.com',
                password: 'Heyben@77',
            }

            await request(app).post('/auth/register').send(userInfo)
            const userRepository = connection.getRepository(User)
            const user = await userRepository.find()
            expect(user[0]).toHaveProperty('role')
            expect(user[0].role).toBe('customer')
        })
        it('should store the hashed password in the database', async () => {
            const userInfo = {
                firstName: 'Ben',
                lastName: 'Stokes',
                email: 'benstokes@hotmail.com',
                password: 'Heyben@77',
            }

            await request(app).post('/auth/register').send(userInfo)
            const userRepository = connection.getRepository(User)
            const users = await userRepository.find()

            expect(users[0].password).not.toBe(userInfo.password)
            expect(users[0].password).toHaveLength(60)
        })
        it('should store unique email addresses in the database and return 400 is duplicate email found', async () => {
            const userInfo = {
                firstName: 'Ben',
                lastName: 'Stokes',
                email: 'benstokes@hotmail.com',
                password: 'Heyben@77',
            }

            const userRepository = connection.getRepository(User)
            await userRepository.save({ ...userInfo })

            const response = await request(app)
                .post('/auth/register')
                .send(userInfo)
            expect(response.statusCode).toBe(400)
        })
    })

    describe('Sad path - given invalid email address', () => {
        it('should return 400 if email field is missing', async () => {
            const userInfo = {
                firstName: 'Ben',
                lastName: 'Stokes',
                email: '',
                password: 'Heyben@77',
            }

            const response = await request(app)
                .post('/auth/register')
                .send(userInfo)
            const userRepository = connection.getRepository(User)
            const users = await userRepository.find()
            expect(response.statusCode).toBe(400)
            expect(users).toHaveLength(0)
        })
    })

    describe('Normal Path - fields are not sending properly', () => {
        it('should trim the email field', async () => {
            const userInfo = {
                firstName: 'Ben',
                lastName: 'Stokes',
                email: 'hello@gmail.com ',
                password: 'Heyben@77',
            }

            const userRepository = connection.getRepository(User)

            await request(app).post('/auth/register').send(userInfo)
            const users = await userRepository.find()

            expect(users.length).toBe(1)
            expect(users[0].email).toBe('hello@gmail.com')
        })
    })
})
