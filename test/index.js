/**
 * Created by gwilliamson on 11/22/14.
 */
var models = require("../models");
models.sequelize.sync().success(function () {
    console.log('Successfully built test tables')

    /* Create test fixture here */
    transaction = { transactionId: 1, description: 'Test Transaction 1', transactionDate: '2014-11-22', amount: 123.45 }
    models.Transaction.create(transaction).success(function(transaction) {
        console.log('Inserted transaction')
    })
})

