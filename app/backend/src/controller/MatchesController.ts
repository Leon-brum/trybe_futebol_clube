import { Request, Response } from 'express';
import MatcheService from '../service/matches.service';
import mapStatusHTTP from '../utils/mapStatusHTTP';

export default class MatcheController {
  constructor(
    private matcheService = new MatcheService(),
  ) { }

  public async getAllMatches(req: Request, res: Response): Promise<Response> {
    const { inProgress } = req.query;
    const response = await this.matcheService.getAllMatches(inProgress as string);

    return res.status(200).json(response.data);
  }

  public async finishMatches(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    await this.matcheService.finishMatches(Number(id));
    return res.status(200).json({ message: 'Finished' });
  }

  public async updateByIdMatch(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const { homeTeamGoals, awayTeamGoals } = req.body;

    await this.matcheService.updateByIdMatch(
      Number(id),
      Number(homeTeamGoals),
      Number(awayTeamGoals),
    );
    return res.status(200).json({ message: 'Updated' });
  }

  public async createMatches(req: Request, res: Response): Promise<Response> {
    const {
      homeTeamId, awayTeamId, homeTeamGoals, awayTeamGoals,
    } = req.body;
    const matches = await this.matcheService.createMatch(
      Number(homeTeamId),
      Number(awayTeamId),
      Number(homeTeamGoals),
      Number(awayTeamGoals),
    );
    return res.status(mapStatusHTTP(matches.status)).json(matches.data);
  }
}
