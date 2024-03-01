import SequelizeMatches from '../database/models/SequelizeMatches';
import SequelizeTeam from '../database/models/SequelizeTeam';
import IMatches from '../Interfaces/Matches/IMatche';
import { IMatchesModel } from '../Interfaces/Matches/IMatcheModel';

export default class MacheModel implements IMatchesModel {
  private model = SequelizeMatches;

  public async findAll(): Promise<IMatches[]> {
    const matches = await this.model.findAll({
      include: [{
        model: SequelizeTeam, as: 'homeTeam', attributes: { exclude: ['id'] } },
      {
        model: SequelizeTeam, as: 'awayTeam', attributes: { exclude: ['id'] },
      }],
    });
    return matches as IMatches[];
  }

  public async finishMatches(id: number): Promise<boolean> {
    await this.model.update({ inProgress: false }, { where: { id } });
    return true;
  }

  public async updateByIdMatch(id: number, homeTeam: number, awayTeam: number): Promise<boolean> {
    await this.model.update(
      { homeTeamGoals: homeTeam, awayTeamGoals: awayTeam },
      { where: { id } },
    );

    return true;
  }

  public async createMatch(
    homeTeamId: number,
    awayTeamId: number,
    homeTeamGoals: number,
    awayTeamGoals: number,
  ): Promise<IMatches> {
    const matches = await this.model.create({
      homeTeamId, homeTeamGoals, awayTeamId, awayTeamGoals, inProgress: true,
    });
    return matches as IMatches;
  }
}
