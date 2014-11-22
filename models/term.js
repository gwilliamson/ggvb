/**
 * Created by gwilliamson on 11/20/14.
 */
"use strict";

module.exports = function(sequelize, DataTypes) {
    var Transaction = sequelize.define("Term", {
        termId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        type: DataTypes.ENUM('week'),
        name: DataTypes.STRING,
        startDate: DataTypes.DATE,
        numDays: DataTypes.INTEGER,
        sequence: DataTypes.INTEGER,
        limit: DataTypes.DECIMAL
    }, {
        classMethods: {
            associate: function(models) {
                // associations can be defined here
            }
        }
    });

    return Transaction;
};
