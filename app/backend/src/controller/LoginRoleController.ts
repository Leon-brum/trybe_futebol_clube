// import { Request, Response } from 'express';
// import UserService from '../service/users.service';
// import IUser from '../Interfaces/Users/IUser';

// export default class LoginRoleController {
//   constructor(
//     private userService = new UserService(),
//   ) { }

//   public async getLogin(req: Request, res: Response):Promise<Response> {
//     const { email } = req.body.payload;
//     const { data } = await this.userService.getUserEmail(email);
//     const { role } = data as IUser;

//     return res.status(200).json({ role });
//   }
// }
