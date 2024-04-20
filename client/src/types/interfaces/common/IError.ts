import { AlertTypeEnum } from '../../enums/AlertTypeEnum';

export interface IError {
  message: string;
  unmountAfter: number;
  id: string;
  errorType: AlertTypeEnum;
}
