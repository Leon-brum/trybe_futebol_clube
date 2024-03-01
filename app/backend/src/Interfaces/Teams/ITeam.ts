import { Identifiable } from '..';

export default interface Team extends Identifiable {
  id: number,
  teamName: string,
}
