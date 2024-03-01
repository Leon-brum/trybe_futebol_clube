import Team from './ITeam';
import { ID } from '..';

export interface ITeamModel {
  findAll(): Promise<Team[]>,
  findById(id: ID): Promise<Team | null>
}
