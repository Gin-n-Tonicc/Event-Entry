import { RoleEnum } from '../../enums/RoleEnum';
import { IObjectWithId } from '../common/IObjectWithId';

export interface IUser extends IObjectWithId {
  firstname: string;
  email: string;
  role: RoleEnum;
  education: string;
  currentWorkPlace: string;
  workExperience: string;
  whatCanHelpWith: string;
  additionalInfoRequired: boolean;
}
