import request from 'supertest'
import app from '../app'
import { accessSync } from 'fs';

describe('router', () => {

    let response

    it('should return code http 200 when it requests /api/graphiql', async () => {
        const response = await request(app).get("/api/graphql?query=%7B%0A%20%20__type(name%3A%20%22ID%22)%20%7B%0A%20%20%20%20name%0A%20%20%7D%0A%7D")
        expect(response.statusCode).toBe(200)
    })

    it('should return right response when it requests /api/graphiql', async () => {
        const response = await request(app).get("/api/graphql?query=%7B%0A%20%20__type(name%3A%20%22ID%22)%20%7B%0A%20%20%20%20name%0A%20%20%7D%0A%7D")
        expect(response.text).toMatchSnapshot()
    })

    it('should return code http 200 when it requests /api/graphiql', async () => {
        const response = await request(app).get("/api/graphiql")
        expect(response.statusCode).toBe(200)
    })

    it('should return right response when it requests /api/graphiql', async () => {
        const response = await request(app).get("/api/graphiql")
        expect(response.text).toMatchSnapshot()
    })
    

}) 

