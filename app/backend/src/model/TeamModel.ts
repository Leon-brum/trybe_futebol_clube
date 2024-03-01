import SequelizeTeam from '../database/models/SequelizeTeam';
import ITeam from '../Interfaces/Teams/ITeam';
import { ITeamModel } from '../Interfaces/Teams/ITeamModel';

export default class TeamModel implements ITeamModel {
  private model = SequelizeTeam;

  async findAll(): Promise<ITeam[]> {
    const db = await this.model.findAll();
    return db;
  }

  async findById(id: ITeam['id']): Promise<ITeam | null> {
    const db = await this.model.findByPk(id);
    if (db == null) return null;
    return db;
  }
}
