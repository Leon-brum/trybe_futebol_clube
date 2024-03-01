import { compareSync } from 'bcryptjs';
import { Request, Response } from 'express';
import UserService from '../service/users.service';
import JWT from '../utils/JWT';
import IUser from '../Interfaces/Users/IUser';
import mapStatusHTTP from '../utils/mapStatusHTTP';

interface token extends Request {
  token?: { id: string };
}

export default class UserController {
  constructor(
    private userService = new UserService(),
  ) { }

  public async login(req: Request, res: Response) {
    const { email, password } = req.body;
    const { status, data } = await this.userService.getUserEmail(email);
    const { id, username, role, email: useEmail, password: usePassword } = data as IUser;

    if (status !== 'SUCCESSFUL') {
      return res.status(mapStatusHTTP(status)).json(data);
    }
    if (!compareSync(password, usePassword)) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const token = JWT.sign({ id, username, role, email: useEmail, password: usePassword });

    return res.status(mapStatusHTTP(status)).json({ token });
  }

  public async findById(req: token, res: Response): Promise<Response> {
    const { token } = req;
    if (!token) return res.status(401).json({ message: 'missing token' });

    const user = await this.userService.findById(token.id) as { status: number, message: string };
    return res.status(user.status).json(user.message);
  }
}
