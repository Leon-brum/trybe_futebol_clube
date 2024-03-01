import { Router, Request, Response } from 'express';
import UsersController from '../controller/UserController';
import Validations from '../middleware/validations';

const userController = new UsersController();

const router = Router();

router.get(
  '/role',
  Validations.validateToken,
  (req: Request, res: Response) => userController.findById(req, res),
);

router.post(
  '/',
  Validations.validateLogin,
  (req, res) => userController.login(req, res),
);

export default router;
