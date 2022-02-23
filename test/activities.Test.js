const request = require('supertest');
const app = require('../app');
const chai = require('chai');
const expect = require('chai').expect
const chaiHttp = require('chai-http')
chai.use(chaiHttp)

const agent = request.agent(app)
const admCredentials = { email: "test1@test.com", password: '1234' }

describe("ACTIVITIES - without Auth integration tests", () => {

  it('GET activities/ - without auth: should get 401', (done) => {
      agent.get('/activities').end((err, res) => {
          expect(res).to.have.status(401)
          done();
      })
  })


  it('#POST activities/ - without auth: should get 401 ', (done) => {
      agent.post('/activities').end((err, res) => {
          expect(res).to.have.status(401)
          done();
      })

  })

})

describe('ACTIVITIES - testing with auth', () => {
  let jwtToken;

  before((done) => {
   agent.post('/auth/login').send(admCredentials).end((err,res)=>{
       if(err) done(err);
       jwtToken = res.body.token;
       done()
   })
  })


  it('#POST activities with auth, but empty fields: should get 400 and errors array', () => {
       agent.post('/activities')
       .set('Authorization', 'Bearer '+jwtToken)
       .end((err,res)=>{
            expect(res.body).to.have.a.property('errors')
            expect(res).to.have.status(400)
       })
  })

})

describe('#POST /activities', async function () {
  let jwtToken;
  const test = {
    body: {
      name: 'Actividad Test66666',
      content: 'Demo',
      image: 'https://live.staticflickr.com/65535/49737580966_d7eb77f786_b.jpg'
    },
    expected: {
      id: 33,
      name: 'Actividad Test33',
      content: 'Demo',
      image: 'https://live.staticflickr.com/65535/49737580966_d7eb77f786_b.jpg'
    },
    expectedStatus: 201
  };

  before((done) => {
   agent.post('/auth/login').send(admCredentials).end((err,res)=>{
       if(err) done(err);
       jwtToken = res.body.token;
       done()
   })
  })


  it('should create an activity successfully', async function () {
    const res = await request(app)
      .post('/activities')
      .set('Authorization', 'Bearer '+jwtToken)
      .send(test.body)
      expect(test.expectedStatus)
  });

});

describe('#PUT /activities/:id', async function () {
  let jwtToken;
  const test = {
    body: {
      name: 'Actividad Test',
      content: 'Demo',
      image: 'https://live.staticflickr.com/65535/49737580966_d7eb77f786_b.jpg'
    },
    expected: {
      id: 1,
      name: 'Actividad Test',
      content: 'Demo',
      image: 'https://live.staticflickr.com/65535/49737580966_d7eb77f786_b.jpg'
    },
    _id: 1,
    expectedStatus: 200
  };
  const testError = {
    body: {
      name: 'Actividad Test',
      content: 'Demo',
      image: 'https://live.staticflickr.com/65535/49737580966_d7eb77f786_b.jpg'
    },
    expected: {
      errors: [
        {
          "msg": "Member test123456 with undefined undefined doesn't exists."
        }
      ]
    },
    _id: 33,
    expectedStatus: 404
  };

  before((done) => {
   agent.post('/auth/login').send(admCredentials).end((err,res)=>{
       if(err) done(err);
       jwtToken = res.body.token;
       done()
   })
  })


  it('should update an activity successfully', async function () {
    const res = await request(app)
      .put(`/activities/${test._id}`)
      .set('Authorization', 'Bearer '+jwtToken)
      .send(test.body)
      expect(test.expectedStatus)

  });

  //Testing Error handler

  it('member doesnt exist', async function () {
    const res = await request(app)
      .put(`/activities/${testError._id}`)
      .set('Authorization', 'Bearer '+jwtToken)
      .send(testError.body)
      expect(testError.expectedStatus)

  });
});