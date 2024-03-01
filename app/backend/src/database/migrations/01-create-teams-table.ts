import {
  Model,
  QueryInterface,
  DataTypes,
} from 'sequelize';
import Team from '../../Interfaces/Teams/ITeam';

export default {
  up: async (queryInterface: QueryInterface) => {
    return queryInterface.createTable<Model<Team>>('teams', {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      teamName: {
        type: DataTypes.STRING,
        field: 'team_name',
        allowNull: false,
      },
    });
  },
  down: async (queryInterface: QueryInterface) => {
    return queryInterface.dropTable('teams');
  },
};
