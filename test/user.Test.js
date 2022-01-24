const { expect } = require('chai');
const request = require('supertest');
const app = require('../app');

describe('Register users', async () => {
  const testSuccess = {
    body: {
      firstName: 'firstName',
      lastName: 'lastname',
      email: 'email@email.com',
      image:
        'https://www.designevo.com/res/templates/thumb_small/colorful-hand-and-warm-community.png',
      password: 'password',
      passwordConfirmation: 'password',
      roleId: 1,
    },
    expectedBody: {
      // this is in request.body.data.user
      id: 2,
      firstName: 'firstName',
      lastName: 'lastname',
      email: 'email@email.com',
      image:
        'https://www.designevo.com/res/templates/thumb_small/colorful-hand-and-warm-community.png',
      roleId: 1,
      // dates not included  to facilitate test
    },
    expectedStatus: 200,
  };
  it('should register a user successfully', async () => {
    const response = await request(app)
      .post('/auth/register')
      .send(testSuccess.body)
      .expect(testSuccess.expectedStatus);

    for (const [key, value] of Object.entries(testSuccess.expectedBody)) {
      expect(response.body.data.user).to.have.property(key, value);
    }
    expect(response.body.data.token).to.be.a('string');
  });

  // ///////////////////////////////////

  const testErrors = [
    {
      body: {
        firstName: 'firstName',
        lastName: 'lastname',
        email: 'email@email.com',
        image:
          'https://www.designevo.com/res/templates/thumb_small/colorful-hand-and-warm-community.png',
        password: 'password',
        passwordConfirmation: 'passNotEqual',
        roleId: 1,
      },
      expectedBody: {
        errors: [
          {
            value: 'passNotEqual',
            msg: 'Password not equal',
            param: 'passwordConfirmation',
            location: 'body',
          },
        ],
      },
      expectedStatus: 400,
      description: 'invalid body',
    },
    {
      body: {
        firstName: 'firstName',
        lastName: 'lastname',
        email: 'email@email.com',
        image:
          'https://www.designevo.com/res/templates/thumb_small/colorful-hand-and-warm-community.png',
        password: 'password',
        passwordConfirmation: 'password',
        roleId: 1,
      },
      expectedBody: {
        errors: [
          {
            msg: 'unique value duplicated on entity',
          },
        ],
      },
      expectedStatus: 400,
      description: 'regiter with email in use',
    },
  ];

  for (const testCase of testErrors) {
    it(testCase.description, async () => {
      const response = await request(app)
        .post('/auth/register')
        .send(testCase.body)
        .expect(testCase.expectedStatus);

      expect(response.body).to.eql(testCase.expectedBody);
    });
  }
});

describe('Login users', async () => {
  const testSuccess = {
    body: {
      email: 'test@test.com',
      password: '1234',
    },
    expectedBody: {
      // this is in request.body.data.user
      id: 1,
      firstName: 'Usuario',
      lastName: 'Demo',
      email: 'test@test.com',
      image:
        'https://www.designevo.com/res/templates/thumb_small/colorful-hand-and-warm-community.png',
      roleId: 1,
      // dates omited to facilitate tests
    },
    expectedStatus: 200,
  };

  it('should login a user successfully', async () => {
    const response = await request(app)
      .post('/auth/login')
      .send(testSuccess.body)
      .expect(testSuccess.expectedStatus);

    for (const [key, value] of Object.entries(testSuccess.expectedBody)) {
      expect(response.body.data.user).to.have.property(key, value);
    }
    expect(response.body.data.token).to.be.a('string');
  });

  // //////////////////////////

  const testErrors = [
    {
      body: {
        email: 'email@email.com',
        password: 'notthepassword',
      },
      expectedBody: {
        errors: [{ msg: 'invalid credentials' }],
      },
      expectedStatus: 400,
      description: 'wrong password',
    },
    {
      body: {
        email: 'abc123',
        password: 'anything',
      },
      expectedBody: {
        errors: [
          {
            value: 'abc123',
            msg: 'Invalid value',
            param: 'email',
            location: 'body',
          },
        ],
      },
      expectedStatus: 400,
      description: 'invalid email',
    },
    {
      body: {
        email: 'not@registered.com',
        password: 'password',
      },
      expectedBody: {
        errors: [
          {
            msg: 'no user found with email not@registered.com',
          },
        ],
      },
      expectedStatus: 400,
      description: 'unregistered user',
    },
  ];

  for (const testCase of testErrors) {
    it(testCase.description, async () => {
      const response = await request(app)
        .post('/auth/login')
        .send(testCase.body)
        .expect(testCase.expectedStatus);

      expect(response.body).to.eql(testCase.expectedBody);
    });
  }
});
