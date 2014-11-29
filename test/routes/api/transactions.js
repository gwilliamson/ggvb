/**
 * Created by gwilliamson on 11/16/14.
 */
var request = require('supertest'),
    app = require("../../../app"),
    models = require("../../../models");


describe('Transactions API:', function () {

    before(function(done) {
        models.sequelize.sync()
            .then(function () {
                /* Create test fixture */
                transaction = {
                    transactionId: 1,
                    description: 'Test Transaction 1',
                    transactionDate: '2014-11-22',
                    amount: 123.45
                }
                models.Transaction.create(transaction)
                    .catch(function (err) {
                        console.log(err)
                    })
                done()
            })
    })

    describe('GET /api/transactions/1', function () {
        it('responds with json', function (done) {
            request(app)
                .get('/api/transactions/1')
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .expect(200, done)
        })
    })

    describe('GET /api/transactions', function () {
        it('responds with json', function (done) {
            request(app)
                .get('/api/transactions')
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .expect(200, done)
        })
    })

    describe('POST /api/transactions', function () {
        it('creates a new transaction', function (done) {
            var transaction = {transactionDate: '2014-11-21', description: 'Test Transaction', amount: 123.45}
            request(app)
                .post('/api/transactions')
                .set('Accept', 'application/json')
                .send(transaction)
                .expect('Content-Type', /json/)
                .expect(201, done)
        })
    })

    describe('POST /api/transactions', function () {
        it('fails to validate transaction with no transactionDate', function (done) {
            var transaction = {description: 'Test Transaction', amount: 44.44}
            request(app)
                .post('/api/transactions')
                .set('Accept', 'application/json')
                .send(transaction)
                .expect('Content-Type', /json/)
                .expect(/transactionDate cannot be null/)
                .expect(400, done)
        })
    })

    describe('POST /api/transactions', function () {
        it('fails to validate transaction with no description', function (done) {
            var transaction = {transactionDate: '2014-11-21', amount: 44.44}
            request(app)
                .post('/api/transactions')
                .set('Accept', 'application/json')
                .send(transaction)
                .expect('Content-Type', /json/)
                .expect(/description cannot be null/)
                .expect(400, done)
        })
    })

    describe('POST /api/transactions', function () {
        it('fails to validate transaction with no amount', function (done) {
            var transaction = {transactionDate: '2014-11-21', description: 'Test Transaction'}
            request(app)
                .post('/api/transactions')
                .set('Accept', 'application/json')
                .send(transaction)
                .expect('Content-Type', /json/)
                .expect(/amount cannot be null/)
                .expect(400, done)
        })
    })

    describe('POST /api/transactions', function () {
        it('fails to validate transaction with invalid transactionDate', function (done) {
            var transaction = {transactionDate: 'nope', description: 'Test Transaction', amount: 1.25}
            request(app)
                .post('/api/transactions')
                .set('Accept', 'application/json')
                .send(transaction)
                .expect('Content-Type', /json/)
                .expect(/Validation isDate failed/)
                .expect(400, done)
        })
    })

    describe('POST /api/transactions', function () {
        it('fails to validate transaction with empty description', function (done) {
            var transaction = {transactionDate: '2014-11-21', amount: 44.44, description: ''}
            request(app)
                .post('/api/transactions')
                .set('Accept', 'application/json')
                .send(transaction)
                .expect('Content-Type', /json/)
                .expect(/Validation notEmpty failed/)
                .expect(400, done)
        })
    })

    describe('PUT /api/transactions/1', function () {
        it('updates the transaction', function (done) {
            transaction = {
                transactionId: 1,
                description: 'Updated Transaction',
                transactionDate: '2014-11-22',
                amount: 123.45
            }
            request(app)
                .put('/api/transactions/1')
                .set('Accept', 'application/json')
                .send(transaction)
                .expect('Content-Type', /json/)
                .expect(/Transaction 1 updated/)
                .expect(200, done)
        })
    })

    describe('PUT /api/transactions/100', function () {
        it('returns 404 Not Found', function (done) {
            transaction = {
                transactionId: 100,
                description: 'Updated Transaction',
                transactionDate: '2014-11-22',
                amount: 123.45
            }
            request(app)
                .put('/api/transactions/100')
                .set('Accept', 'application/json')
                .send(transaction)
                .expect('Content-Type', /json/)
                .expect(/Transaction 100 not found/)
                .expect(404, done)
        })
    })

    describe('DELETE /api/transactions/100', function () {
        it('returns 404 Not Found', function (done) {
            request(app)
                .delete('/api/transactions/100')
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .expect(/Transaction 100 not found/)
                .expect(404, done)
        })
    })

    describe('DELETE /api/transactions/1', function () {
        it('deletes the transaction', function (done) {
            request(app)
                .delete('/api/transactions/1')
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .expect(/Transaction 1 destroyed/)
                .expect(200, done)
        })
    })
})
