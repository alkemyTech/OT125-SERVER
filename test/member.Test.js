const { expect } = require('chai');
//const request = require('supertest');
const app = require('../app');
var request = require('supertest')(app);
const admCredentials = { email: "test1@test.com", password: '1234' }


 describe('#POST /members', async function () {
  const test = {
    body: {
      name: "member 22",
      facebookUrl: "https://www.facebook.com/member",
      instagramUrl:"https://www.instagram.com/member" ,
      linkedinUrl: "https://www.linkedIn.com/member",
      image: " https://i.imgur.com/example-member.jpg ",
      description: "Sample description of member "
    },
    expected: {
      id: 22,
      name: "member 22",
      facebookUrl: "https://www.facebook.com/member",
      instagramUrl:"https://www.instagram.com/member" ,
      linkedinUrl: "https://www.linkedIn.com/member",
      image: " https://i.imgur.com/example-member.jpg ",
      description: "Sample description of member "
      
    },
    expectedStatus: 200
  };

  let jwtToken;
  before((done) => {
    request
      .post('/auth/login')
      .send(admCredentials)
      .end((err, res) => {
        if (err) done(err);
        jwtToken = res.body.token;
        done()
      })
  })
  it('should create a member successfully',  function (done) {
   request
      .post('/members')
      .set('Authorization', 'Bearer ' + jwtToken)
      .send(test.body)
      .expect(test.expectedStatus,done)
  });

  //Testing error handler
   const testError = {
    body: {
      name: 'Member 1',
      facebookUrl: "https://www.facebook.com/member",
      instagramUrl:"https://www.instagram.com/member" ,
      linkedinUrl: "https://www.linkedIn.com/member",
      image: " https://i.imgur.com/example-member.jpg ",
      description: "Sample description of member "
      
    },
    expected: {
      errors: [
          {
              msg: "The member with name Member 1 already exists in DB",
              
          }
      ]
  },
    expectedStatus: 409,
    description:'The name of member must not be repeated'
  }
  it(testError.description, function (done) {
    request
      .post('/members')
      .set('Authorization', 'Bearer ' + jwtToken)
      .send(testError.body)
      .expect(testError.expectedStatus,done)

  }) 
}); 
