/**
 * Created by gwilliamson on 11/16/14.
 */
var express = require('express')
var router = express.Router()

var transactions = [
    {
        "id": 1,
        "description": "Philz Coffee",
        "amount": 3.5,
        "date": "2014-11-15"
    },
    {
        "id": 2,
        "description": "Toy for Violet",
        "amount": 6.78,
        "date": "2014-11-16"
    }
]

/* GET list of transactions */
router.get('/', function(req, res) {
    res.json(transactions)
})

/* GET single transaction */
router.get('/:id', function(req, res, next) {
    var transaction = getTransactionById(req.params.id, transactions)
    if (!transaction) {
        var err = new Error('Could not find transaction with id ' + req.params.id);
        err.status = 404;
        next(err);
    }
    res.json(transaction)
})

module.exports = router

/**
 * Get transaction by id
 *
 * @param id
 * @param transactions
 * @returns {*}
 */
var getTransactionById = function(id, transactions) {
    for (index = 0; index < transactions.length; index++) {
        if (transactions[index].id == id) {
            return transactions[index]
        }
    }
}
