const request = require('supertest')

const app = require('../../src/app')
const connection = require('../../src/database/connection')

describe('NGO', () => {
    beforeEach(async () => {
        await connection.migrate.rollback()
        await connection.migrate.latest()
    })

    afterAll(async () => {
        await connection.destroy()
    })

    it('should be able to create a new NGO', async () => {
        const response = await request(app)
            .post('/ongs')
            .send({
                name: "ICIA",
                email: "contato@icia.com",
                whatsapp: "8197777888",
                city: "Caruaru",
                uf: "PE"
            })
        
        expect(response.body).toHaveProperty('id')
        expect(response.body.id).toHaveLength(8)
    })
})