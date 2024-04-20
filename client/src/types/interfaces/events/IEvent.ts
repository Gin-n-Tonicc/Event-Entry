import { IUser } from '../auth/IUser';
import { IFile } from '../common/IFile';
import { IObjectWithId } from '../common/IObjectWithId';

export interface IEvent extends IObjectWithId {
  name: string;
  description: string;
  address: string;
  picture: IFile;
  startTime: Date;
  endTime: Date;
  liked_users: IUser[];
}
