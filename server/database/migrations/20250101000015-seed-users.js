'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        const users = [
            {
                tgId: '123456789',
                username: 'crypto_whale',
                firstName: 'Alex',
                lastName: 'Johnson',
                langCode: 'en',
                invitedBy: null,
                photoUrl: null,
                points: 0,
                isActive: true,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                tgId: '234567890',
                username: 'moon_rider',
                firstName: 'Maria',
                lastName: 'Garcia',
                langCode: 'es',
                invitedBy: null,
                photoUrl: null,
                points: 0,
                isActive: true,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                tgId: '345678901',
                username: 'hodl_master',
                firstName: 'Dmitry',
                lastName: 'Ivanov',
                langCode: 'ru',
                invitedBy: null,
                photoUrl: null,
                points: 0,
                isActive: true,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                tgId: '456789012',
                username: 'defi_queen',
                firstName: 'Sophie',
                lastName: 'Chen',
                langCode: 'zh',
                invitedBy: null,
                photoUrl: null,
                points: 0,
                isActive: true,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                tgId: '567890123',
                username: 'ton_believer',
                firstName: 'John',
                lastName: 'Smith',
                langCode: 'en',
                invitedBy: null,
                photoUrl: null,
                points: 0,
                isActive: true,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                tgId: '678901234',
                username: null,
                firstName: 'Anna',
                lastName: 'Kowalski',
                langCode: 'pl',
                invitedBy: null,
                photoUrl: null,
                points: 0,
                isActive: true,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                tgId: '789012345',
                username: 'web3_dev',
                firstName: 'Carlos',
                lastName: 'Rodriguez',
                langCode: 'es',
                invitedBy: null,
                photoUrl: null,
                points: 0,
                isActive: true,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                tgId: '890123456',
                username: 'nft_collector',
                firstName: 'Emma',
                lastName: 'Wilson',
                langCode: 'en',
                invitedBy: null,
                photoUrl: null,
                points: 0,
                isActive: false,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                tgId: '901234567',
                username: 'blockchain_fan',
                firstName: 'Pierre',
                lastName: 'Dubois',
                langCode: 'fr',
                invitedBy: null,
                photoUrl: null,
                points: 0,
                isActive: true,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                tgId: '012345678',
                username: 'crypto_newbie',
                firstName: 'Lisa',
                lastName: 'Brown',
                langCode: 'en',
                invitedBy: null,
                photoUrl: null,
                points: 0,
                isActive: true,
                createdAt: new Date(),
                updatedAt: new Date()
            }
        ];

        await queryInterface.bulkInsert('Users', users, {});
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete('Users', {
            tgId: {
                [Sequelize.Op.in]: [
                    '123456789', '234567890', '345678901', '456789012', '567890123',
                    '678901234', '789012345', '890123456', '901234567', '012345678'
                ]
            }
        }, {});
    }
};

