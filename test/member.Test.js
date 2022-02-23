const { expect } = require('chai');
//const request = require('supertest');
const app = require('../app');
var request = require('supertest')(app);
const admCredentials = { email: "test1@test.com", password: '1234' }


 describe('#POST /members', async function () {
  const test = {
    body: {
      name: "member 6",
      facebookUrl: "https://www.facebook.com/member",
      instagramUrl:"https://www.instagram.com/member" ,
      linkedinUrl: "https://www.linkedIn.com/member",
      image: " https://i.imgur.com/example-member.jpg ",
      description: "Sample description of member "
    },
    expected: {
      id: 6,
      name: "member 6",
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

describe('#GET/members/:id', function () {
  const test = {
    

    _id: 1,
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

  it('should find  a member successfully', function (done) {
    request
      .get(`/members/${test._id}`)
      .set('Authorization', 'Bearer ' + jwtToken)
      .expect(test.expectedStatus, done)
  });

  //Testing Error handler 
  const testError = {
    
    expected: {
      errors: [
        {
          "msg": "Member with id 33 doesn't exists."
        }
      ]
    },
    _id: 33,
    expectedStatus: 404,
    description: 'if the ID of member does not exist  returns an  error message'
  };
  it(testError.description, function (done) {
    request
      .delete(`/members/${testError._id}`)
      .set('Authorization', 'Bearer ' + jwtToken)
      .send(testError.body)
      .expect(testError.expectedStatus, done)
  });
}); 

describe('#PUT /members/:id', function () {

  const test = {
    body: {
      name: 'Memberss 3',
      facebookUrl: "https://www.facebook.com/member",
      instagramUrl:"https://www.instagram.com/member" ,
      linkedinUrl: "https://www.linkedIn.com/member",
      image: " https://i.imgur.com/example-member.jpg ",
      description: "Sample description of member"

    },
    expected: {
      id: 3,
      name: 'Memberss 3',
      facebookUrl: "https://www.facebook.com/member",
      instagramUrl:"https://www.instagram.com/member" ,
      linkedinUrl: "https://www.linkedIn.com/member",
      image: " https://i.imgur.com/example-member.jpg ",
      description: "Sample description of member"
      

    },
    _id: 3,
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


  it('should update a member successfully', function (done) {
    request
      .put(`/members/${test._id}`)
      .set('Authorization', 'Bearer ' + jwtToken)
      .send(test.body)
      .expect(test.expectedStatus, done)
  });

  //Testing Error handler validation
  const testError = {
    body: {
      name: 'Member 33',
      facebookUrl: "https://www.facebook.com/member",
      instagramUrl:"https://www.instagram.com/member" ,
      linkedinUrl: "https://www.linkedIn.com/member",
      image: " https://i.imgur.com/example-member.jpg ",
      description: "Sample description of member"
      
    },
    expected: {
      errors: [
        {
          "msg": "Member with id 33 doesn't exists."
        }
      ]
    },
    _id: 33,
    expectedStatus: 404,
    description: 'if the ID of Member does not exist  returns an  error message'
  };
  it(testError.description, function (done) {
    request
      .delete(`/members/${testError._id}`)
      .set('Authorization', 'Bearer ' + jwtToken)
      .send(testError.body)
      .expect(testError.expectedStatus, done)
  });
}); 

describe('#DELETE/members/:id', function () {
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

  it('should delete a member successfully', function (done) {
    request
      .delete(`/members/${test._id}`)
      .set('Authorization', 'Bearer ' + jwtToken)
      .expect(test.expectedStatus, done)
  });

  //Testing Error handler 
  const testError = {
    body: {
      name: 'Member 33',
      facebookUrl: "https://www.facebook.com/member",
      instagramUrl:"https://www.instagram.com/member" ,
      linkedinUrl: "https://www.linkedIn.com/member",
      image: " https://i.imgur.com/example-member.jpg ",
      description: "Sample description of member"
    },
    expected: {
      errors: [
        {
          "msg": "Member with id 33 doesn't exists."
        }
      ]
    },
    _id: 33,
    expectedStatus: 404,
    description: 'if the ID of member does not exist  returns an  error message'
  };
  it(testError.description, function (done) {
    request
      .delete(`/members/${testError._id}`)
      .set('Authorization', 'Bearer ' + jwtToken)
      .send(testError.body)
      .expect(testError.expectedStatus, done)
  });
}); 