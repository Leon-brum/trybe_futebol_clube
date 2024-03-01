import { Request, Router, Response } from 'express';
import MatchesController from '../controller/MatchesController';
import Validations from '../middleware/validations';

const matchesController = new MatchesController();

const router = Router();

router.get('/', (req: Request, res: Response) => matchesController.getAllMatches(req, res));

router.patch(
  '/:id/finish',
  Validations.validateToken,
  (req: Request, res: Response) => matchesController.finishMatches(req, res),
);

router.patch(
  '/:id',
  Validations.validateToken,
  (req: Request, res: Response) => matchesController.updateByIdMatch(req, res),
);

router.post(
  '/',
  Validations.validateToken,
  Validations.validateMatch,
  (req: Request, res: Response) => matchesController.createMatches(req, res),
);
export default router;
