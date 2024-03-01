import { NextFunction, Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';
import token from '../Interfaces/IToken';

const JWT_SECRET = process.env.JWT_SECRET || 'jwt_secret';

class Validations {
  static validateLogin(req: Request, res: Response, next: NextFunction): Response | void {
    const login = req.body;
    const reqKeys = ['email', 'password'];
    const notFoundKey = reqKeys.find((key) => !(key in login));
    if (notFoundKey) {
      return res.status(400).json({ message: 'All fields must be filled' });
    }
    if (!login.password || !login.email) {
      return res.status(400).json({ message: 'All fields must be filled' });
    }
    const regex = /\S+@\S+\.\S+/;
    if (login.password.length < 6 || !regex.test(login.email)) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }
    next();
  }

  static async validateToken(
    req: token,
    res: Response,
    next: NextFunction,
  ): Promise<Response | void> {
    const { authorization } = req.headers;

    if (!authorization) {
      return res.status(401).json({ message: 'Token not found' });
    }

    try {
      const emptyToken = authorization.replace('Bearer ', '');
      const tokenValid = await jwt.verify(emptyToken, JWT_SECRET);
      req.token = tokenValid as object;

      return next();
    } catch (error) {
      return res.status(401).json({ message: 'Token must be a valid token' });
    }
  }

  static validateMatch(req: Request, res: Response, next: NextFunction) {
    const { homeTeamId, awayTeamId } = req.body;

    if (homeTeamId === awayTeamId) {
      return res.status(422).json(
        { message: 'It is not possible to create a match with two equal teams' },
      );
    }
    return next();
  }
}

export default Validations;
