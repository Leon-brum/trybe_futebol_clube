import { Request, Response } from 'express';
import LeaderboardService from '../service/leaderboard.service';

export default class TeamController {
  constructor(
    private matcheService = new LeaderboardService(),
  ) { }

  public async leaderboardHome(_req: Request, res: Response): Promise<Response> {
    const leaderboard = await this.matcheService.leaderboardHome();
    return res.status(200).json(leaderboard);
  }
}
