"use strict";

module.exports = function(sequelize, DataTypes) {
  var Transaction = sequelize.define("Transaction", {
    transactionId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    description: DataTypes.STRING,
    amount: DataTypes.DECIMAL(10,2),
    transactionDate: DataTypes.DATE
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });

  return Transaction;
};
