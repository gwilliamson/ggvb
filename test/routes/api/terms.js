/**
 * Created by gwilliamson on 11/23/14.
 */
var request = require('supertest'),
    app = require("../../../app"),
    models = require("../../../models");


describe('Terms API:', function () {

    before(function(done) {
        models.sequelize.sync()
            .then(function () {
                /* Create test fixture */
                term = {
                    termId: 1,
                    type: 'week',
                    name: 'Test Term 1',
                    startDate: '2014-11-16',
                    endDate: '2014-11-23',
                    sequence: 47,
                    limit: 800
                }
                models.Term.create(term)
                    .catch(function (err) {
                        console.log(err)
                    })

                term = {
                    termId: 2,
                    type: 'week',
                    name: 'Test Term 2',
                    startDate: '2014-11-23',
                    endDate: '2014-11-30',
                    sequence: 48,
                    limit: 800
                }
                models.Term.create(term)
                    .catch(function (err) {
                        console.log(err)
                    })

                term = {
                    termId: 3,
                    type: 'week',
                    name: 'Test Term 3',
                    startDate: '2014-11-30',
                    endDate: '2014-12-06',
                    sequence: 49,
                    limit: 800
                }
                models.Term.create(term)
                    .catch(function (err) {
                        console.log(err)
                    })

                done()
            })
    })

    describe('GET /api/terms/1', function () {
        it('responds with json', function (done) {
            request(app)
                .get('/api/terms/1')
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .expect(200, done)
        })
    })

    describe('GET /api/terms', function () {
        it('responds with json', function (done) {
            request(app)
                .get('/api/terms')
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .expect(200, done)
        })
    })

    describe('POST /api/terms', function () {
        it('creates a new term', function (done) {
            var term = {type: 'week', name: 'Test Term', startDate: '2014-11-21', endDate: '2014-11-28', sequence: 1, limit: 123.45}
            request(app)
                .post('/api/terms')
                .set('Accept', 'application/json')
                .send(term)
                .expect('Content-Type', /json/)
                .expect(201, done)
        })
    })

    describe('POST /api/terms', function () {
        it('fails to validate term with no type', function (done) {
            var term = {name: 'Test Term', startDate: '2014-11-21', endDate: '2014-11-28', sequence: 1, limit: 123.45}
            request(app)
                .post('/api/terms')
                .set('Accept', 'application/json')
                .send(term)
                .expect('Content-Type', /json/)
                .expect(/type cannot be null/)
                .expect(400, done)
        })
    })

    describe('POST /api/terms', function () {
        it('fails to validate term with no name', function (done) {
            var term = {type: 'week', startDate: '2014-11-21', endDate: '2014-11-28', sequence: 1, limit: 123.45}
            request(app)
                .post('/api/terms')
                .set('Accept', 'application/json')
                .send(term)
                .expect('Content-Type', /json/)
                .expect(/name cannot be null/)
                .expect(400, done)
        })
    })

    describe('POST /api/terms', function () {
        it('fails to validate term with no startDate', function (done) {
            var term = {type: 'week', name: 'Test Term', endDate: '2014-11-28', sequence: 1, limit: 123.45}
            request(app)
                .post('/api/terms')
                .set('Accept', 'application/json')
                .send(term)
                .expect('Content-Type', /json/)
                .expect(/startDate cannot be null/)
                .expect(400, done)
        })
    })

    describe('POST /api/terms', function () {
        it('fails to validate term with no endDate', function (done) {
            var term = {type: 'week', name: 'Test Term', startDate: '2014-11-21', sequence: 1, limit: 123.45}
            request(app)
                .post('/api/terms')
                .set('Accept', 'application/json')
                .send(term)
                .expect('Content-Type', /json/)
                .expect(/endDate cannot be null/)
                .expect(400, done)
        })
    })

    describe('POST /api/terms', function () {
        it('fails to validate term with no sequence', function (done) {
            var term = {type: 'week', name: 'Test Term', startDate: '2014-11-21', endDate: '2014-11-28', limit: 123.45}
            request(app)
                .post('/api/terms')
                .set('Accept', 'application/json')
                .send(term)
                .expect('Content-Type', /json/)
                .expect(/sequence cannot be null/)
                .expect(400, done)
        })
    })

    describe('POST /api/terms', function () {
        it('creates a new term with no limit', function (done) {
            var term = {type: 'week', name: 'Test Term', startDate: '2014-11-21', endDate: '2014-11-28', sequence: 1, limit: 123.45}
            request(app)
                .post('/api/terms')
                .set('Accept', 'application/json')
                .send(term)
                .expect('Content-Type', /json/)
                .expect(201, done)
        })
    })

    describe('PUT /api/terms/1', function () {
        it('updates the term', function (done) {
            term = {
                name: 'Updated Term'
            }
            request(app)
                .put('/api/terms/1')
                .set('Accept', 'application/json')
                .send(term)
                .expect('Content-Type', /json/)
                .expect(/Term 1 updated/)
                .expect(200, done)
        })
    })

    describe('PUT /api/terms/100', function () {
        it('returns 404 Not Found', function (done) {
            term = {
                termId: 100,
                description: 'Updated Term',
                termDate: '2014-11-22',
                amount: 123.45
            }
            request(app)
                .put('/api/terms/100')
                .set('Accept', 'application/json')
                .send(term)
                .expect('Content-Type', /json/)
                .expect(/Term 100 not found/)
                .expect(404, done)
        })
    })

    describe('DELETE /api/terms/100', function () {
        it('returns 404 Not Found', function (done) {
            request(app)
                .delete('/api/terms/100')
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .expect(/Term 100 not found/)
                .expect(404, done)
        })
    })

    describe('DELETE /api/terms/1', function () {
        it('deletes the term', function (done) {
            request(app)
                .delete('/api/terms/1')
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .expect(/Term 1 destroyed/)
                .expect(200, done)
        })
    })

    describe('GET /api/terms/2014-11-25', function() {
        it('gets the term that the date falls in', function(done) {
            request(app)
                .get('/api/terms/2014-11-25')
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .expect(/Test Term 2/)
                .expect(200, done)
        })
    })

    describe('GET /api/terms/2014-11-30', function() {
        it('gets the term that the date falls in', function(done) {
            request(app)
                .get('/api/terms/2014-11-30')
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .expect(/Test Term 3/)
                .expect(200, done)
        })
    })

    describe('GET /api/terms/2014-12-05', function() {
        it('gets the term that the date falls in', function(done) {
            request(app)
                .get('/api/terms/2014-12-05')
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .expect(/Test Term 3/)
                .expect(200, done)
        })
    })

})
