import request from 'supertest'
import app from '../../app.js'

describe('POST /auth/register', () => {
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
    })
})
