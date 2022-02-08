const { expect } = require('chai');
const request = require('supertest');
const app = require('../app');


describe('#POST /activities', async function () {
  const test = {
    body: {
      name: 'Actividad Test33',
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
  it('should create an activity successfully', async function () {
    const res = await request(app)
      .post('/activities')
      .send(test.body)
      .expect(test.expectedStatus)
  });

  //Testing error handler
  const testError = {
    body: {
      name: '',
      content: 'Demo',
      image: 'https://live.staticflickr.com/65535/49737580966_d7eb77f786_b.jpg'
    },
    expected: {
      errors: [
          {
              msg: "name is required",
              param: "name",
              location: "body"
          },
          {
              msg: "must be string",
              param: "name",
              location: "body"
          }
      ]
  },
    expectedStatus: 400
  }
  it('Invalid body', async function () {
    const res = await request(app)
      .post('/activities')
      .send(testError.body)
      .expect(testError.expectedStatus)

  })
});

describe('#PUT /activities/:id', async function () {
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
  it('should update an activity successfully', async function () {
    const res = await request(app)
      .put(`/activities/${test._id}`)
      .send(test.body)
      .expect(test.expectedStatus)
  });

  //Testing Error handler
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
  it('member doesnt exist', async function () {
    const res = await request(app)
      .put(`/activities/${testError._id}`)
      .send(testError.body)
      .expect(testError.expectedStatus)
  });
});
