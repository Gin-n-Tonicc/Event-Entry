import { IFullUser } from '../auth/IFullUser';
import { IObjectWithId } from '../common/IObjectWithId';

export interface IUserFriend extends IObjectWithId {
  user: IFullUser;
  friend: IFullUser;
  isConfirmed: boolean;
}
