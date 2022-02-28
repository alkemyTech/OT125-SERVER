const { expect }= require('chai');
const request = require('supertest');
const app = require('../app');
const admin = { email: "test1@test.com", password: '1234' };

describe('#POST /contacts', () => {
    const test = {
        body: {
            name: 'Contacts Test',
            phone: '123123',
            email: 'test@test.com',
            message: 'Demo',
        },
        expected: {
            name: 'Contacts Test',
            phone: '123123',
            email: 'test@test.com',
            message: 'Demo',
            deletedAt: null,
            createdAt: new Date(),
            updatedAt: new Date(),
        },
        expectedStatus: 201
    };
    it('Create-Contact', () => {
        const res = request(app)
        .post('/contacts')
        .send(test.body)
        .expect(test.expectedStatus)
    })

    const testError = {
        body: {
            name: '',
            phone: '',
            email: '',
            message: '',
        },
        expected: {
            errors: [
                {
                    "value": "",
                    "msg": "Name can't be empty",
                    "param": "name",
                    "location": "body"
                },
                {
                    "value": "",
                    "msg": "Invalid value",
                    "param": "email",
                    "location": "body"
                },
                {
                    "value": "",
                    "msg": "Message can't be empty",
                    "param": "message",
                    "location": "body"
                },
                {
                    "value": "",
                    "msg": "Phone can't be empty",
                    "param": "phone",
                    "location": "body"
                },
                {
                    "value": "",
                    "msg": "Only numbers",
                    "param": "phone",
                    "location": "body"
                }
            ]
        },
        expectedStatus: 400
    }
    it('Invalid body', async () => {
        const res = await request(app)
        .post('/contacts')
        .send(testError.body)
        .expect(testError.expectedStatus)
    })
})

describe('#GET /contacts', () => {
    let jwt;
    before((done) => {
        request(app)
            .post('/auth/login').send(admin).end((err, res) => {
                if (err) done(err);
                jwt = res.body.token;
                done()
            })
    })

    it('Get-Contacts', (done) => {
        request(app)
        .get('/contacts')
            .set('Accept', 'application/json')
            .set('Content-Type', 'application/json')
            .set('Authorization', 'Bearer ' +jwt)
            .expect(200)
            .expect('Content-Type', /json/)
            .expect( response => {
                expect(response.body).not.to.be.empty;
                expect(response.body).to.be.an('object');
            })
            .end(done);
    })

    const testError = {
        expected: {
            errors: [
                {
                    msg: "no authorization header provided"
                }
            ]
        },
        expectedStatus: 401
    }
    it('No autorization', () => {
        request(app)
        .post('/contacts')
        .set('Authorization', 'Bearer ' + jwt)
        .expect(testError.expectedStatus)
    })
}) 