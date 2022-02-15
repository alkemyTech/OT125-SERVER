const { expect } = require('chai');
const request = require('supertest');
const app = require('../app');


describe('#PUT /testimonials/:id', async function () {
    const test = {
      body: {
        name: 'Testimonial 2',
        image: 'https://live.staticflickr.com/65535/49737580966_d7eb77f786_b.jpg',
        content: 'Sample content of testimonial'
        
      },
      expected: {
        id: 2,
        name: 'Testimonials 2',
        image: 'https://live.staticflickr.com/65535/49737580966_d7eb77f786_b.jpg',
        content: 'Sample content of testimonial',
        
      },
      _id: 2,
      expectedStatus: 200
    };
    it('should update a testimonial successfully', async function () {
      const res = await request(app)
        .put(`/testimonials/${test._id}`)
        .send(test.body)
        .expect(test.expectedStatus)
    });

  //Testing Error handler validation
  const testError = {
    body: {
      name: '',
      image: 'https://live.staticflickr.com/65535/49737580966_d7eb77f786_b.jpg',
      content: 'Sample content of testimonial'
      
    },
    expected: {
      errors: [
        {
          "msg": "Empty name not allowed."
        }
      ]
    },
    _id: 4,
    expectedStatus: 400,
    description:'edit testimonial without name returns an error message'
  };
  it(testError.description, async function () {
    const res = await request(app)
      .put(`/testimonials/${testError._id}`)
      .send(testError.body)
      .expect(testError.expectedStatus)
  });
});

describe('#DELETE/testimonials/:id', async function () {
    const test = {
      body: {
        name: 'Testimonial 10',
        image: 'https://live.staticflickr.com/65535/49737580966_d7eb77f786_b.jpg',
        content: 'Sample content of testimonial'
        
      },

      _id: 10,
      expectedStatus: 202
    };
    it('should delete a testimonial successfully', async function () {
      const res = await request(app)
        .delete(`/testimonials/${test._id}`)
        .expect(test.expectedStatus)
    });
  
    //Testing Error handler 
    const testError = {
      body: {
        name: 'Testimonial 33',
        image: 'https://live.staticflickr.com/65535/49737580966_d7eb77f786_b.jpg',
        content: 'Sample content of testimonial'
        
      },
      expected: {
        errors: [
          {
            "msg": "Testimonial with id 33 doesn't exists."
          }
        ]
      },
      _id:33,
      expectedStatus: 404,
      description:'if the ID of testimonial does not exist  returns an  error message'
    };
    it(testError.description, async function () {
      const res = await request(app)
        .delete(`/testimonials/${testError._id}`)
        .send(testError.body)
        .expect(testError.expectedStatus)
    });
  }); 