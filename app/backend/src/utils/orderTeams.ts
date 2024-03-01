import ILeaderBoard from '../Interfaces/Leaderboard/ILeaderboard';

function compareByProperty(a: ILeaderBoard, b: ILeaderBoard, property: keyof ILeaderBoard): number {
  if (a[property] < b[property]) return 1;
  if (a[property] > b[property]) return -1;
  return 0;
}

function compareTeams(teamA: ILeaderBoard, teamB: ILeaderBoard): number {
  const pointComparison = compareByProperty(teamA, teamB, 'totalPoints');
  if (pointComparison !== 0) return pointComparison;

  const goalBalanceComparison = compareByProperty(teamA, teamB, 'goalsBalance');
  if (goalBalanceComparison !== 0) return goalBalanceComparison;

  return compareByProperty(teamA, teamB, 'goalsFavor');
}

function getOrderTeams(teams: ILeaderBoard[]): ILeaderBoard[] {
  return teams.sort(compareTeams);
}

export default getOrderTeams;
