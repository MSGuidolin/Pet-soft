const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('Pets',
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
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
            },
            specie: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notNull: {
                        msg: 'It requires a valid specie'
                    }
                }
            },
            race: {
                type: DataTypes.STRING
            },
            dateBirth: {
                type: DataTypes.DATEONLY
            },
            weight: {
                type: DataTypes.REAL
            }
        },
        { timestamps: false }
    );
};