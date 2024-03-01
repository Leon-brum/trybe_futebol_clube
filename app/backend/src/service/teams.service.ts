import TeamModel from '../model/TeamModel';
import Team from '../Interfaces/Teams/ITeam';
import { ITeamModel } from '../Interfaces/Teams/ITeamModel';
import { ServiceResponse } from '../Interfaces/ServiceResponse';

export default class TeamService {
  constructor(private teamModel: ITeamModel = new TeamModel()) { }

  public async getAllTeams(): Promise<ServiceResponse<Team[]>> {
    const allTeams = await this.teamModel.findAll();
    return { status: 'SUCCESSFUL', data: allTeams };
  }

  public async getTeamById(id: number): Promise<ServiceResponse<Team>> {
    const team = await this.teamModel.findById(id);
    if (!team) return { status: 'NOT_FOUND', data: { message: `Team ${id} not found` } };
    return { status: 'SUCCESSFUL', data: team };
  }
}
