import { Identifiable } from '..';

// ID

export default interface User extends Identifiable {
  id: number,
  username: string,
  role: string,
  email: string,
  password: string,
}
