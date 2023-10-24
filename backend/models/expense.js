'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {

    class Expense extends Model {
   
      };

    Expense.init({
    expenseId:{
        type: DataTypes.SMALLINT,
        primaryKey: true,
        autoIncrement: true  
    },

    category: DataTypes.STRING,
    subcategory: DataTypes.STRING,
    recurring: DataTypes.STRING,
    amount: DataTypes.INTEGER
    }, {
    sequelize,
    underscored: true,
    modelName: 'expense',
    });
    return Expense;
};




