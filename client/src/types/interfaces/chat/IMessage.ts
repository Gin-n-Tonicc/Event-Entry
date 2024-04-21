import { IFullUser } from '../auth/IFullUser';
import { IObjectWithId } from '../common/IObjectWithId';

export interface IMessage extends IObjectWithId {
  content: string;
  sentAt: Date;
  senderId: IFullUser;
  receiverId: IFullUser;
}
