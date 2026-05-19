'use strict';

const { v4: uuidv4 } = require('uuid');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        const transactions = [
            { userId: '123456789', amount: '5.5', date: new Date('2024-01-16T10:30:00Z') },
            { userId: '123456789', amount: '10.25', date: new Date('2024-02-05T14:15:00Z') },
            { userId: '123456789', amount: '3.75', date: new Date('2024-03-10T09:45:00Z') },
            { userId: '123456789', amount: '15.0', date: new Date('2024-04-15T16:20:00Z') },
            { userId: '123456789', amount: '7.89', date: new Date('2024-05-20T11:00:00Z') },
            { userId: '123456789', amount: '20.5', date: new Date('2024-06-25T13:30:00Z') },
            { userId: '123456789', amount: '12.34', date: new Date('2024-07-30T15:45:00Z') },
            { userId: '123456789', amount: '8.67', date: new Date('2024-08-14T10:10:00Z') },

            { userId: '234567890', amount: '2.5', date: new Date('2024-01-22T11:00:00Z') },
            { userId: '234567890', amount: '4.75', date: new Date('2024-02-18T13:25:00Z') },
            { userId: '234567890', amount: '6.3', date: new Date('2024-03-25T15:40:00Z') },
            { userId: '234567890', amount: '3.2', date: new Date('2024-04-30T09:15:00Z') },
            { userId: '234567890', amount: '5.55', date: new Date('2024-06-05T14:30:00Z') },
            { userId: '234567890', amount: '7.8', date: new Date('2024-07-12T16:00:00Z') },

            { userId: '345678901', amount: '50.0', date: new Date('2024-02-03T10:00:00Z') },
            { userId: '345678901', amount: '25.5', date: new Date('2024-03-15T12:30:00Z') },
            { userId: '345678901', amount: '30.75', date: new Date('2024-04-20T14:45:00Z') },
            { userId: '345678901', amount: '15.25', date: new Date('2024-05-28T11:20:00Z') },
            { userId: '345678901', amount: '40.0', date: new Date('2024-07-08T09:00:00Z') },

            { userId: '456789012', amount: '1.5', date: new Date('2024-02-12T13:00:00Z') },
            { userId: '456789012', amount: '2.25', date: new Date('2024-03-18T15:30:00Z') },
            { userId: '456789012', amount: '3.8', date: new Date('2024-04-25T10:45:00Z') },
            { userId: '456789012', amount: '1.95', date: new Date('2024-05-30T12:15:00Z') },
            { userId: '456789012', amount: '2.7', date: new Date('2024-07-15T14:00:00Z') },
            { userId: '456789012', amount: '4.5', date: new Date('2024-08-20T16:30:00Z') },

            { userId: '567890123', amount: '100.0', date: new Date('2024-03-07T10:00:00Z') },
            { userId: '567890123', amount: '75.5', date: new Date('2024-04-12T13:20:00Z') },
            { userId: '567890123', amount: '50.25', date: new Date('2024-05-18T15:45:00Z') },
            { userId: '567890123', amount: '85.75', date: new Date('2024-06-22T11:30:00Z') },
            { userId: '567890123', amount: '60.0', date: new Date('2024-07-28T09:15:00Z') },

            { userId: '789012345', amount: '10.0', date: new Date('2024-04-03T14:00:00Z') },
            { userId: '789012345', amount: '12.5', date: new Date('2024-04-15T16:20:00Z') },
            { userId: '789012345', amount: '8.75', date: new Date('2024-05-10T10:40:00Z') },
            { userId: '789012345', amount: '15.3', date: new Date('2024-06-08T13:50:00Z') },
            { userId: '789012345', amount: '20.45', date: new Date('2024-07-14T15:10:00Z') },
            { userId: '789012345', amount: '18.9', date: new Date('2024-08-19T12:30:00Z') },
            { userId: '789012345', amount: '25.6', date: new Date('2024-09-05T09:45:00Z') },

            { userId: '901234567', amount: '0.5', date: new Date('2024-05-12T11:00:00Z') },
            { userId: '901234567', amount: '1.25', date: new Date('2024-05-25T13:15:00Z') },
            { userId: '901234567', amount: '0.75', date: new Date('2024-06-10T15:30:00Z') },
            { userId: '901234567', amount: '2.0', date: new Date('2024-06-28T10:20:00Z') },
            { userId: '901234567', amount: '1.5', date: new Date('2024-07-18T12:45:00Z') },
            { userId: '901234567', amount: '3.25', date: new Date('2024-08-08T14:00:00Z') },
            { userId: '901234567', amount: '2.8', date: new Date('2024-08-25T16:15:00Z') },
            { userId: '901234567', amount: '1.95', date: new Date('2024-09-12T11:30:00Z') },
            { userId: '901234567', amount: '4.0', date: new Date('2024-09-28T13:50:00Z') },
            { userId: '901234567', amount: '2.5', date: new Date('2024-10-15T15:20:00Z') },
            { userId: '901234567', amount: '3.75', date: new Date('2024-10-18T10:00:00Z') },
            { userId: '901234567', amount: '1.8', date: new Date('2024-10-19T09:15:00Z') },
        ];

        const transactionRecords = transactions.map((tx, index) => ({
            id: uuidv4(),
            userId: tx.userId,
            amount: tx.amount,
            currency: 'TON',
            metadata: null,
            createdAt: tx.date,
            updatedAt: tx.date
        }));

        await queryInterface.bulkInsert('TransactionHistory', transactionRecords, {});
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete('TransactionHistory', {
            metadata: {
                [Sequelize.Op.like]: '%mock_tx_%'
            }
        }, {});
    }
};

