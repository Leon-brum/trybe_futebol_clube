import {
  Model,
  QueryInterface,
  DataTypes,
} from 'sequelize';
import IMatches from '../../Interfaces/Matches/IMatche';

export default {
  up(queryInterface: QueryInterface) {
    return queryInterface.createTable<Model<IMatches>>('matches', {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      homeTeamId: {
        allowNull: false,
        type: DataTypes.INTEGER,
        field: 'home_team_id',
        references: {
          model: 'teams',
          key: 'id',
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    },
      homeTeamGoals: {
        allowNull: false,
        field: 'home_team_goals',
        type: DataTypes.INTEGER,
      },
      awayTeamId: {
        allowNull: false,
        type: DataTypes.INTEGER,
        field: 'away_team_id',
        references: {
          model: 'teams',
          key: 'id',
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      },
      awayTeamGoals: {
        allowNull: false,
        type: DataTypes.INTEGER,
        field: 'away_team_goals',
    },
    inProgress: {
      allowNull: false,
      type: DataTypes.BOOLEAN,
      field: 'in_progress',
    }});
  },
  down(queryInterface: QueryInterface) {
    return queryInterface.dropTable('matches');
  },
};
