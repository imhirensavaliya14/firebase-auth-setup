const { DataTypes } = require('sequelize');
const sequelize = require('../database');

const Plan = sequelize.define('plans', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    paypal_plan_id: {
        type: DataTypes.STRING(50),
        allowNull: false,
    },
    plan_name: {
        type: DataTypes.STRING(100),
        allowNull: false,
    },
    plan_duration: {
        type: DataTypes.ENUM('monthly', 'yearly'),
        allowNull: false,
    },
    plan_amount: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
    }
}, {
    tableName: 'plans',
    timestamps: false, // Disable createdAt/updatedAt timestamps if not needed
});

module.exports = Plan;
