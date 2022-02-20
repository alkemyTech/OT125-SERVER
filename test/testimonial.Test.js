const { expect } = require('chai');
//const request = require('supertest');
const app = require('../app');
var request = require('supertest')(app);
const admCredentials = { email: "test1@test.com", password: '1234' }



describe('#POST /testimonials', async function () {
  const test = {
    body: {
      name: 'Testimonial 6',
      image: 'https://i.imgur.com/example-testimonial.jpg',
      content: 'Sample content of testimonial'
    },
    expected: {
      id: 6,
      name: 'Testimonial 6',
      image: 'https://i.imgur.com/example-testimonial.jpg',
      content: 'Sample content of testimonial'
      
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
  it('should create a testimonial successfully',  function (done) {
   request
      .post('/testimonials')
      .set('Authorization', 'Bearer ' + jwtToken)
      .send(test.body)
      .expect(test.expectedStatus,done)
  });

  //Testing error handler
   const testError = {
    body: {
      name: '',
      image: 'https://i.imgur.com/example-testimonial.jpg',
      content: 'Sample content of testimonial'
      
    },
    expected: {
      errors: [
          {
           
            value: "",
            msg: "name is a required field",
            param: "name",
            location: "body"
              
          }
      ]
  },
    expectedStatus: 400,
    description:'The name of testimonial is required'
  }
  it(testError.description, function (done) {
    request
      .post('/testimonials')
      .set('Authorization', 'Bearer ' + jwtToken)
      .send(testError.body)
      .expect(testError.expectedStatus,done)

  }) 
}); 

describe('#PUT /testimonials/:id', function () {

  const test = {
    body: {
      name: 'Testimonials 2',
      image: 'https://i.imgur.com/example-testimonial.jpg',
      content: 'Sample content of testimonial'

    },
    expected: {
      id: 2,
      name: 'Testimonials 2',
      image: 'https://i.imgur.com/example-testimonial.jpg',
      content: 'Sample content of testimonial',

    },
    _id: 2,
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


  it('should update a testimonial successfully', function (done) {
    request
      .put(`/testimonials/${test._id}`)
      .set('Authorization', 'Bearer ' + jwtToken)
      .send(test.body)
      .expect(test.expectedStatus, done)
  });

  //Testing Error handler validation
  const testError = {
    body: {
      name: '',
      image: 'https://i.imgur.com/example-testimonial.jpg',
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
    description: 'edit testimonial without name returns an error message'
  };

  it(testError.description, function (done) {
    request
      .put(`/testimonials/${testError._id}`)
      .set('Authorization', 'Bearer ' + jwtToken)
      .send(testError.body)
      .expect(testError.expectedStatus, done)
  });
});

describe('#DELETE/testimonials/:id', function () {
  const test = {

    _id: 5,
    expectedStatus: 202
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

  it('should delete a testimonial successfully', function (done) {
    request
      .delete(`/testimonials/${test._id}`)
      .set('Authorization', 'Bearer ' + jwtToken)
      .expect(test.expectedStatus, done)
  });

  //Testing Error handler 
  const testError = {
    body: {
      name: 'Testimonial 33',
      image: 'https://i.imgur.com/example-testimonial.jpg',
      content: 'Sample content of testimonial'

    },
    expected: {
      errors: [
        {
          "msg": "Testimonial with id 33 doesn't exists."
        }
      ]
    },
    _id: 33,
    expectedStatus: 404,
    description: 'if the ID of testimonial does not exist  returns an  error message'
  };
  it(testError.description, function (done) {
    request
      .delete(`/testimonials/${testError._id}`)
      .set('Authorization', 'Bearer ' + jwtToken)
      .send(testError.body)
      .expect(testError.expectedStatus, done)
  });
}); 