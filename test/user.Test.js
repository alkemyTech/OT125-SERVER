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
    },
    expectedBody: {
      id: 21,
      firstName: 'firstName',
      lastName: 'lastname',
      email: 'email@email.com',
      image:
        'https://www.designevo.com/res/templates/thumb_small/colorful-hand-and-warm-community.png',
      roleId: 2,
      // dates not included  to facilitate test
    },
    expectedStatus: 201,
  };
  it('should register a user successfully', async () => {
    const response = await request(app)
      .post('/auth/register')
      .send(testSuccess.body)
      .expect(testSuccess.expectedStatus);

    for (const [key, value] of Object.entries(testSuccess.expectedBody)) {
      expect(response.body.user).to.have.property(key, value);
    }
    expect(response.body.token).to.be.a('string');
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
      },
      expectedBody: {
        errors: [
          {
            msg: 'email must be unique',
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
      email: 'test1@test.com',
      password: '1234',
    },
    expectedBody: {
      id: 1,
      firstName: 'Usuario1',
      lastName: 'Demo',
      email: 'test1@test.com',
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
      expect(response.body.user).to.have.property(key, value);
    }
    expect(response.body.token).to.be.a('string');
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
            msg: `User with email not@registered.com doesn't exist.`,
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
