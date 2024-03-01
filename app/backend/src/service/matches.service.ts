import TeamModel from '../model/TeamModel';
import MatcheModel from '../model/MatcheModel';
import IMatches from '../Interfaces/Matches/IMatche';
import { ITeamModel } from '../Interfaces/Teams/ITeamModel';
import { IMatchesModel } from '../Interfaces/Matches/IMatcheModel';
import { ServiceResponse, ServiceMessage } from '../Interfaces/ServiceResponse';

export default class MatcheService {
  constructor(
    private matchModel: IMatchesModel = new MatcheModel(),
    private teamModel: ITeamModel = new TeamModel(),
  ) { }

  public async getAllMatches(query: string | undefined): Promise<ServiceResponse<IMatches[]>> {
    const allMatches = await this.matchModel.findAll();
    if (!query) {
      return { status: 'SUCCESSFUL', data: allMatches };
    }

    if (query === 'true') {
      const result = allMatches.filter((match) => match.inProgress === true);
      return { status: 'SUCCESSFUL', data: result };
    }

    const result = allMatches.filter((match) => match.inProgress === false);
    return { status: 'SUCCESSFUL', data: result };
  }

  public async finishMatches(id: number): Promise<boolean> {
    await this.matchModel.finishMatches(id);
    return true;
  }

  public async updateByIdMatch(id: number, homeTeam: number, awayTeam: number): Promise<boolean> {
    await this.matchModel.updateByIdMatch(id, homeTeam, awayTeam);
    return true;
  }

  public async createMatch(
    homeTeamId: number,
    awayTeamId: number,
    homeTeamGoals: number,
    awayTeamGoals: number,
  ): Promise<ServiceResponse<IMatches | ServiceMessage>> {
    const homeTeam = await this.teamModel.findById(homeTeamId);
    const awayTeam = await this.teamModel.findById(awayTeamId);

    if (!homeTeam || !awayTeam) {
      return { status: 'NOT_FOUND', data: { message: 'There is no team with such id!' } };
    }
    const matchData = await this.matchModel.createMatch(
      homeTeamId,
      awayTeamId,
      homeTeamGoals,
      awayTeamGoals,
    );
    return { status: 'CREATE', data: matchData };
  }
}
