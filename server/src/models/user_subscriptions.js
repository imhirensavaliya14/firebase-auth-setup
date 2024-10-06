const { DataTypes } = require('sequelize');
const sequelize = require('../database');

const UserSubscription = sequelize.define('user_subscriptions', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    subscription_status: {
        type: DataTypes.STRING(20),
        allowNull: false,
    },
    payment_provider: {
        type: DataTypes.STRING(20),
        allowNull: false,
    },
    subscription_id: {
        type: DataTypes.STRING(50),
        allowNull: false,
    },
    next_billing_date: {
        type: DataTypes.DATE,
        allowNull: true, // Can be NULL if no next billing is scheduled
    }
}, {
    tableName: 'user_subscriptions',
    timestamps: false, // Disable createdAt/updatedAt timestamps if not needed
});

module.exports = UserSubscription;
