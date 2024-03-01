import UserModel from '../model/UserModel';
import IUser from '../Interfaces/Users/IUser';
import { IUserModel } from '../Interfaces/Users/IUserModel';
import { ServiceResponse } from '../Interfaces/ServiceResponse';

export default class UserService {
  constructor(private userModel: IUserModel = new UserModel()) { }

  public async getUserEmail(email: string): Promise<ServiceResponse<IUser>> {
    const user = await this.userModel.findbyEmail(email);
    if (!user) return { status: 'UNAUTHORIZED', data: { message: 'Invalid email or password' } };

    return { status: 'SUCCESSFUL', data: user };
  }

  public async findById(id: string): Promise<unknown> {
    const user = await this.userModel.findById(id);
    if (!user) return { status: 401, message: { message: 'user not found' } };

    return { status: 200, message: { role: user.role } };
  }
}
