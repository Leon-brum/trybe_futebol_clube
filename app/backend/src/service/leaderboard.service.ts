import MatcheModel from '../model/MatcheModel';
import TeamModel from '../model/TeamModel';
import { IMatchesModel } from '../Interfaces/Matches/IMatcheModel';
import { ITeamModel } from '../Interfaces/Teams/ITeamModel';
import orderTeams from '../utils/orderTeams';
import teamsHome from '../utils/infos';

export default class LeaderboardService {
  constructor(
    private teamModel: ITeamModel = new TeamModel(),
    private matchModel: IMatchesModel = new MatcheModel(),
  ) { }

  public async leaderboardHome(): Promise<unknown> {
    const teams = await this.teamModel.findAll();
    const matches = await this.matchModel.findAll();

    const matchesFinished = matches.filter((m) => m.inProgress === false);

    const leaderboard = teams.map((team) => {
      const info = teamsHome(team.id, team.teamName, matchesFinished);
      return info;
    });
    const result = await orderTeams(leaderboard);
    return result;
  }
}
