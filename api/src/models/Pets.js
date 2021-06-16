const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('Pets',
        {
            id: {
                type: DataTypes.id,
                primaryKey: true
            },
            name: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notNull: {
                        msg: 'It requires a valid name'
                    }
                }
            }
        },
        { timestamps: false }
    );
};