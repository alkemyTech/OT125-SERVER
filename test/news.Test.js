const { expect } = require('chai');
const request = require('supertest');
const app = require('../app');
const admin = { email: "test1@test.com", password: '1234' };

describe('News test with authorizations', function () {
    let jwtToken;

    before((done) => {
        request(app)
            .post('/auth/login').send(admin).end((err, res) => {
                if (err) done(err);
                jwtToken = res.body.token;
                done()
            })
    })

    it('#GET (ONE) // Should success if credential is valid: Get one user', function (done) {
        request(app)
            .get('/news/2')
            .set('Accept', 'application/json')
            .set('Content-Type', 'application/json')
            .set('Authorization', 'Bearer ' +jwtToken)
            .expect(200)
            .expect('Content-Type', /json/)
            .expect(function (response) {
                expect(response.body).not.to.be.empty;
                expect(response.body).to.be.an('object');
            })
            .end(done);
    });

    it('#POST // Should success if credential is valid: Create one user', function (done) {
        request(app)
            .post('/news')
            .set('Accept', 'application/json')
            .set('Content-Type', 'application/json')
            .set('Authorization', 'Bearer ' +jwtToken)
            .send({
                name: 'News Integration Test',
                content: 'Test demo',
                image: 'image-test.png',
                categoryId: 1,
                createdAt: new Date(),
                updatedAt: new Date(),
            })
            .expect(201)
            .expect('Content-Type', /json/)
            .expect(function (response) {
                expect(response.body).not.to.be.empty;
                expect(response.body).to.be.an('object');
            })
            .end(done);
    });

    it('#PUT // Should success if credential is valid: Update one user', function (done) {
        request(app)
            .put('/news/3')
            .set('Accept', 'application/json')
            .set('Content-Type', 'application/json')
            .set('Authorization', 'Bearer ' +jwtToken)
            .send({
                name: 'News Update Test',
                content: 'Test demo update',
                image: 'image-test-update.png',
                categoryId: 1,
                createdAt: new Date(),
                updatedAt: new Date(),
            })
            .expect(200)
            .expect('Content-Type', /json/)
            .expect(function (response) {
                expect(response.body).not.to.be.empty;
                expect(response.body).to.be.an('object');
            })
            .end(done);
    });

    it('#DELETE // Should success if credential is valid: DELETE ONE USER', function (done) {
        request(app)
            .delete('/news/4')
            .set('Accept', 'application/json')
            .set('Content-Type', 'application/json')
            .set('Authorization', 'Bearer ' +jwtToken)
            .expect(200)
            .expect('Content-Type', /json/)
            .expect(function (response) {
                expect(response.body).not.to.be.empty;
                expect(response.body).to.be.an('object');
            })
            .end(done);
    });



});

describe('News test without authorizations', function () {

    it('#GET // Should success, not credentials needed: get all users', function (done) {
        request(app)
            .get('/news')
            .set('Accept', 'application/json')
            .set('Content-Type', 'application/json')
            .expect(200)
            .expect('Content-Type', /json/)
            .expect(function (response) {
                expect(response.body).not.to.be.empty;
                expect(response.body).to.be.an('object');
            })
            .end(done);
    });

    it('#GET (ONE) // Should give an error message for missing credentials ', function (done) {
        request(app)
            .get('/news/1')
            .set('Accept', 'application/json')
            .set('Content-Type', 'application/json')
            .expect(401)
            .expect('Content-Type', /json/)
            .expect(function (response) {
                expect(response.body).not.to.be.empty;
                expect(response.body).to.be.an('object');
                expect(response.body).to.have.a.property('errors')
            })
            .end(done);
    });

    it('#DELETE // Should give an error message for missing credentials ', function (done) {
        request(app)
            .delete('/news/1')
            .set('Accept', 'application/json')
            .set('Content-Type', 'application/json')
            .expect(401)
            .expect('Content-Type', /json/)
            .expect(function (response) {
                expect(response.body).not.to.be.empty;
                expect(response.body).to.be.an('object');
                expect(response.body).to.have.a.property('errors')
            })
            .end(done);
    });

    it('#POST // Should give an error message for missing credentials ', function (done) {
        request(app)
            .post('/news/')
            .set('Accept', 'application/json')
            .set('Content-Type', 'application/json')
            .expect(401)
            .expect('Content-Type', /json/)
            .expect(function (response) {
                expect(response.body).not.to.be.empty;
                expect(response.body).to.be.an('object');
                expect(response.body).to.have.a.property('errors')
            })
            .end(done);
    });

    it('#UPDATE // Should give an error message for missing credentials ', function (done) {
        request(app)
            .get('/news/3')
            .set('Accept', 'application/json')
            .set('Content-Type', 'application/json')
            .expect(401)
            .expect('Content-Type', /json/)
            .expect(function (response) {
                expect(response.body).not.to.be.empty;
                expect(response.body).to.be.an('object');
                expect(response.body).to.have.a.property('errors')
            })
            .end(done);
    });

});
