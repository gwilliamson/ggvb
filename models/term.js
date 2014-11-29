/**
 * Created by gwilliamson on 11/20/14.
 */
"use strict";

module.exports = function(sequelize, DataTypes) {
    var Term = sequelize.define("Term", {
        termId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        type: {
            type: DataTypes.ENUM('week'),
            allowNull: false
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            notEmpty: true
        },
        startDate: {
            type: DataTypes.DATE,
            allowNull: false,
            validate: {
                isDate: true
            }
        },
        endDate: {
            type: DataTypes.DATE,
            allowNull: false,
            validate: {
                isDate: true
            }
        },
        sequence: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                isInt: true
            }
        },
        limit: {
            type: DataTypes.DECIMAL,
            allowNull: true,
            validate: {
                isDecimal: true
            }
        }
    }, {
        classMethods: {
            associate: function(models) {
                // associations can be defined here
            }
        }
    });

    return Term;
};
