/**
 * Created by gwilliamson on 11/16/14.
 */
var request = require('supertest'),
    app = require("../../../app")

describe('Transactions API:', function() {

    describe('GET /api/transactions', function() {
        it('responds with json', function(done) {
            request(app)
                .get('/api/transactions')
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .expect(200, done)
        })
    })

    describe('GET /api/transactions/1', function() {
        it('responds with json', function(done) {
            request(app)
                .get('/api/transactions/1')
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .expect(200, done)
        })
    })

})
