/**
 * Created by gwilliamson on 11/16/14.
 */
var express = require('express')
var router = express.Router()
var models = require("../../models")

/* GET list of transactions */
router.get('/', function(req, res) {
    models.Transaction.findAll({order: [['transactionDate', 'DESC'], ['createdAt', 'DESC']]})
        .then(function(transactions) {
            res.json(transactions)
        })
})

/* POST a new transaction */
router.post('/', function(req, res) {
    models.Transaction.create(req.body)
        .then(function(transaction) {
            payload = {"message": "Transaction created", "transactionId": transaction.transactionId}
            res.status(201).json(payload)
        })
        .catch(function(err) {
            res.status(400).json(err.errors)
        })
})

/* Update a transaction with PUT */
router.put('/:transactionId', function (req, res) {
    models.Transaction.find({ where: { transactionId: req.params.transactionId } })
        .then(function(transaction) {
            if (transaction != null) {
                transaction.updateAttributes(req.body)
            } else {
                res.status(404).json({message: 'Transaction ' + req.params.transactionId + ' not found'})
            }
            payload = {"message": 'Transaction ' + transaction.transactionId + ' updated'}
            res.json(payload)
        })
        .catch(function (err) {
            res.status(400).json(err.errors)
        })
})

/* DELETE a transaction */
router.delete('/:transactionId', function(req, res) {
    models.Transaction.find({where: {transactionId: req.params.transactionId}})
        .then(function(transaction) {
            if (transaction != null) {
                transaction.destroy()
                    .then(function() {
                        res.json({"message": 'Transaction ' + req.params.transactionId + " destroyed"})
                    })
            } else {
                res.status(404).json({message: 'Transaction ' + req.params.transactionId + ' not found'})
            }
        })
})

/* GET single transaction */
router.get('/:transactionId', function(req, res) {
    models.Transaction.find({where: {transactionId: req.params.transactionId}})
        .then(function(transaction) {
            if (transaction == null) {
                res.status(404).json({message: 'Transaction ' + req.params.transactionId + ' not found'})
            } else {
                res.json(transaction)
            }
        })
})

module.exports = router

