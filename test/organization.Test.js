const chai = require('chai');
const request = require('supertest');
const app = require('../app');
const expect = require('chai').expect
const chaiHttp = require('chai-http')
chai.use(chaiHttp)
const agent = request.agent(app)
const admCredentials = { email: "test1@test.com", password: '1234' }

describe("ORGTESTS - Organization without Auth integration tests", () => {

    it('GET organization/public: Should get 200 and object', (done) => {
        agent.get('/organization/public').end((err, res) => {
            expect(res).to.have.status(200)
            done();
        })
    })


    it(' POST organization/public without auth: should get 401 ', (done) => {
        agent.post('organization/public').end((err, res) => {
            expect(res).to.have.status(401)
            done();
        })

    })

})

describe('ORGTESTS - Organization integration tests with auth', () => {
    let jwtToken;

    before((done) => {
     agent.post('/auth/login').send(admCredentials).end((err,res)=>{
         if(err) done(err);
         jwtToken = res.body.token;
         done()
     })
    })


    it('POST organization/public with auth, but empty fields: should get 400 and errors array', (done) => {
         agent.post('/organization/public')
         .set('Authorization', 'Bearer '+jwtToken)
         .end((err,res)=>{
              expect(res.body).to.have.a.property('errors')
              expect(res).to.have.status(400)
              done()
         })
    })

})

