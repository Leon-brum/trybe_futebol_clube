import {
  Model,
  QueryInterface,
  DataTypes,
} from 'sequelize';
import User from '../../Interfaces/Users/IUser';

export default {
  up: async (queryInterface: QueryInterface) => {
    return queryInterface.createTable<Model<User>>('users', {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      username: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      role: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      email: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      password: {
        allowNull: false,
        type: DataTypes.STRING,
      },
    });
  },
  down: async (queryInterface: QueryInterface) => {
    return queryInterface.dropTable('users');
  },
};
