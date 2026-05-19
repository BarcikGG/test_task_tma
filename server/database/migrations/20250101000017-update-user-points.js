'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        const TON_TO_POINTS_RATE = 289.86;

        const userPoints = [
            { tgId: '123456789', tonAmount: 83.9, points: Math.floor(83.9 * TON_TO_POINTS_RATE) },
            { tgId: '234567890', tonAmount: 30.1, points: Math.floor(30.1 * TON_TO_POINTS_RATE) },
            { tgId: '345678901', tonAmount: 161.5, points: Math.floor(161.5 * TON_TO_POINTS_RATE) },
            { tgId: '456789012', tonAmount: 16.7, points: Math.floor(16.7 * TON_TO_POINTS_RATE) },
            { tgId: '567890123', tonAmount: 371.5, points: Math.floor(371.5 * TON_TO_POINTS_RATE) },
            { tgId: '789012345', tonAmount: 111.5, points: Math.floor(111.5 * TON_TO_POINTS_RATE) },
            { tgId: '901234567', tonAmount: 26.05, points: Math.floor(26.05 * TON_TO_POINTS_RATE) },
        ];

        for (const user of userPoints) {
            await queryInterface.bulkUpdate(
                'Users',
                { points: user.points },
                { tgId: user.tgId }
            );
        }
    },

    async down(queryInterface, Sequelize) {
        const userIds = [
            '123456789', '234567890', '345678901', '456789012',
            '567890123', '789012345', '901234567'
        ];

        await queryInterface.bulkUpdate(
            'Users',
            { points: 0 },
            {
                tgId: {
                    [Sequelize.Op.in]: userIds
                }
            }
        );
    }
};

