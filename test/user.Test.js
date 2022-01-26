const { expect } = require('chai');
const request = require('supertest');
const app = require('../app');

const testsLogin = [
  {
    body: {
      email: 'test@test.com',
      password: '1234',
    },
    expectedBody: {
      data: {
        id: 1,
        firstName: 'Usuario',
        lastName: 'Demo',
        email: 'test@test.com',
        image:
          'https://www.designevo.com/res/templates/thumb_small/colorful-hand-and-warm-community.png',
        roleId: 1,
      },
    },
    expectedStatus: 200,
    description: 'successfull login',
  },
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

const testsRegister = [
  // first user loaded as seed
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
      data: {
        id: 2,
        firstName: 'firstName',
        lastName: 'lastname',
        email: 'email@email.com',
        image:
          'https://www.designevo.com/res/templates/thumb_small/colorful-hand-and-warm-community.png',
        roleId: 1,
        // dates not included  to facilitate test
      },
    },
    expectedStatus: 200,
    description: 'successfull registration',
  },
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

describe('Register users', async () => {
  for (const testCase of testsRegister) {
    it(testCase.description, async () => {
      const response = await request(app)
        .post('/auth/register')
        .send(testCase.body)
        .expect(testCase.expectedStatus);

      if (response?.body?.data?.createdAt) {
        delete response.body.data.createdAt;
        delete response.body.data.updatedAt;
      }

      expect(response.body).to.eql(testCase.expectedBody);
    });
  }
});

describe('Register users', async () => {
  for (const testCase of testsLogin) {
    it(testCase.description, async () => {
      const response = await request(app)
        .post('/auth/login')
        .send(testCase.body)
        .expect(testCase.expectedStatus);

      if (response?.body?.data?.createdAt) {
        delete response.body.data.createdAt;
        delete response.body.data.updatedAt;
      }

      expect(response.body).to.eql(testCase.expectedBody);
    });
  }
});
