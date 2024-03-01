import IMatches from './IMatche';
// import { ID } from '..';

export type MatcheCeateType = {
  homeTeamId: IMatches['homeTeamId'],
  awayTeamId: IMatches['awayTeamId'],
  homeTeamGoals: IMatches['homeTeamGoals'],
  awayTeamGoals: IMatches['awayTeamGoals'],
};

export interface IMatchesModel {
  findAll(): Promise<IMatches[]>,
  finishMatches(id: number): Promise<boolean>,
  updateByIdMatch(id: number, homeTeam: number, awayTeam: number): Promise<boolean>,
  createMatch(homeTeamId: number, awayTeamId: number,
    homeTeamGoals: number, awayTeamGoals: number): Promise<IMatches>;
}
