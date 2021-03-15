'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class User extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate({ Post }) {
            // define association here
            this.hasMany(Post, { foreignKey: 'userId' })
        }

        toJSON() {
            return {...this.get(), id: undefined };
        }
    };
    User.init({
        uuid: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notNull: { msg: 'User must have a name' },
                notNull: { msg: 'Name cannot be empty' },
            }
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notNull: { msg: 'User must have a email' },
                notNull: { msg: 'Email cannot be empty' },
            }
        },
        role: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notNull: { msg: 'User must have a role' },
                notNull: { msg: 'Role cannot be empty' },
            }
        }
    }, {
        sequelize,
        tableName: 'users',
        modelName: 'User',
    });
    return User;
};