import SequelizeUser from '../database/models/SequelizeUser';
import IUser from '../Interfaces/Users/IUser';
import { IUserModel } from '../Interfaces/Users/IUserModel';

export default class UserModel implements IUserModel {
  private model = SequelizeUser;

  async findbyEmail(email: string): Promise<IUser | null> {
    const user = await this.model.findOne({ where: { email } });
    return user;
  }

  public async findById(id: string): Promise<IUser | null> {
    const user = await this.model.findOne({ where: { id } });
    return user;
  }
}
