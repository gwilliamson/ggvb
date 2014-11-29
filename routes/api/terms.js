/**
 * Created by gwilliamson on 11/23/14.
 */
var express = require('express')
var router = express.Router()
var models = require("../../models")
var moment = require('moment')

/* GET list of terms */
router.get('/', function(req, res) {
    models.Term.findAll()
        .then(function(terms) {
            res.json(terms)
        })
})

/* POST a new term */
router.post('/', function(req, res) {
    models.Term.create(req.body)
        .then(function(term) {
            payload = {"message": "Term created", "termId": term.termId}
            res.status(201).json(payload)
        })
        .catch(function(err) {
            res.status(400).json(err.errors)
        })
})

/* Update a term with PUT */
router.put('/:termId', function (req, res) {
    models.Term.find({ where: { termId: req.params.termId } })
        .then(function(term) {
            if (term != null) {
                term.updateAttributes(req.body)
            } else {
                res.status(404).json({message: 'Term ' + req.params.termId + ' not found'})
            }
            payload = {"message": 'Term ' + term.termId + ' updated'}
            res.json(payload)
        })
        .catch(function (err) {
            res.status(400).json(err.errors)
        })
})

/* DELETE a term */
router.delete('/:termId', function(req, res) {
    models.Term.find({where: {termId: req.params.termId}})
        .then(function(term) {
            if (term != null) {
                term.destroy()
                    .then(function() {
                        res.json({"message": 'Term ' + req.params.termId + " destroyed"})
                    })
            } else {
                res.status(404).json({message: 'Term ' + req.params.termId + ' not found'})
            }
        })
})

/* GET single term */
router.get('/:termId', function(req, res) {
    if (req.params.termId.indexOf("-") == -1) {
        models.Term.find({where: {termId: req.params.termId}})
            .then(function(term) {
                if (term == null) {
                    res.status(404).json({message: 'Term ' + req.params.termId + ' not found'})
                } else {
                    res.json(term)
                }
            })
    } else {
        date = moment(req.params.termId)
        models.Term.find(
            {
                where: {
                    startDate: { lte: date.format() },
                    endDate: { gt: date.format() }
                }
            })
            .then(function(term) {
                if (term == null) {
                    res.status(404).json({message: 'Term ' + req.params.termId + ' not found'})
                } else {
                    res.json(term)
                }
            })
    }
})

/* GET total spent for a term */
router.get('/:termId/totalSpent', function (req, res) {
    models.Term.find({where: {termId: req.params.termId}})
        .then(function (term) {
            if (term == null) {
                res.status(404).json({message: 'Term ' + req.params.termId + ' not found'})
            } else {
                return term
            }
        })
        .then(function (term) {
            var startDate = moment(term.startDate)
            var endDate = moment(startDate)
            endDate.add(7, 'days')
            models.Transaction.sum('amount', {where: {transactionDate: {gte: startDate.format(), lt: endDate.format()}}})
                .then(function (sum) {
                    res.json({totalSpent: sum})
                })
        })
})

module.exports = router
