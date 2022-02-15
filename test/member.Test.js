const { expect } = require('chai');
const request = require('supertest');
const app = require('../app');


 describe('#POST /members', async function () {
  const test = {
    body: {
      name: "member 22",
      facebookUrl: "https://www.facebook.com/member",
      instagramUrl:"https://www.instagram.com/member" ,
      linkedinUrl: "https://www.linkedIn.com/member",
      image: " https://i.imgur.com/example-member.jpg ",
      description: "Sample descriptoon of member "
    },
    expected: {
      id: 22,
      name: "member 10",
      facebookUrl: "https://www.facebook.com/member",
      instagramUrl:"https://www.instagram.com/member" ,
      linkedinUrl: "https://www.linkedIn.com/member",
      image: " https://i.imgur.com/example-member.jpg ",
      description: "Sample descriptoon of member "
      
    },
    expectedStatus: 200
  };
  it('should create a member successfully', async function () {
    const res = await request(app)
      .post('/members')
      .send(test.body)
      .expect(test.expectedStatus)
  });

  //Testing error handler
   const testError = {
    body: {
      name: 'Member test',
      content: 'Demo',
      image: 'https://live.staticflickr.com/65535/49737580966_d7eb77f786_b.jpg'
    },
    expected: {
      errors: [
          {
              msg: "The member with name Member test already exists in DB",
              
          }
      ]
  },
    expectedStatus: 409,
    description:'The name of member must not be repeated'
  }
  it(testError.description, async function () {
    const res = await request(app)
      .post('/members')
      .send(testError.body)
      .expect(testError.expectedStatus)

  }) 
}); 
