/**
 * Created by gwilliamson on 11/16/14.
 */
var express = require('express')
var router = express.Router()
var models = require("../../models")

/* GET list of transactions */
router.get('/', function(req, res) {
    models.Transaction.findAll({order: [['transactionDate', 'DESC'], ['createdAt', 'DESC']]}).success(function(transactions) {
        res.json(transactions)
    })
})

/* POST a new transaction */
router.post('/', function(req, res) {
    models.Transaction.create(req.body).success(function(transaction) {
        payload = {"message": "Transaction created", "transactionId": transaction.transactionId}
        res.status(201).json(payload)
    })
})

/* Update a transaction with PUT */
router.put('/:transactionId', function(req, res, next) {
    models.Transaction.update(req.body, { where: { transactionId: req.params.transactionId}}).success(function(transaction) {
        payload = {"message": "Transaction " + req.params.transactionId + " updated" }
        res.json(payload)
    })
})

/* DELETE a transaction */
router.delete('/:transactionId', function(req, res, next) {
    models.Transaction.find({where: {transactionId: req.params.transactionId}}).success(function(transaction) {
        transaction.destroy().success(function(transaction) {
            res.json({"message": 'Transaction ' + req.params.transactionId + " destroyed"})
        })
    })
})

/* GET single transaction */
router.get('/:transactionId', function(req, res, next) {
    models.Transaction.find({where: {transactionId: req.params.transactionId}}).success(function(transaction) {
        if (transaction == null) {
            var err = new Error()
            err.status = 404
            err.message = 'Transaction ' + req.params.transactionId + ' not found'
            next(err)
        } else {
            res.json(transaction)
        }

    })
})

module.exports = router

