import { ISkill } from '../skills/ISkill';
import { IUser } from './IUser';

export interface IFullUser extends IUser {
  skills: ISkill[];
  address: string;
  lastname: string;
  deleted: boolean;
}
