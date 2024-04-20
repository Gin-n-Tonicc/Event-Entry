import { useEffect } from 'react';
import { useErrorContext } from '../../contexts/ErrorContext';
import { AlertTypeEnum } from '../../types';
import './Alert.scss';

interface IParentAlertProps {
  unmountAfter: number;
  message: string;
  id: string;
  errorType: AlertTypeEnum;
}

interface IAlertProps {
  close: Function;
  message: string;
  errorTitle: string;
}

// The component that displays the exception alert
export function ExceptionAlert(props: IAlertProps) {
  return (
    <div className="col-sm-12">
      <div
        className="d-flex justify-content-between align-items-center alert fade alert-simple alert-danger alert-dismissible text-left font__family-montserrat font__size-16 font__weight-light brk-library-rendered rendered show"
        role="alert"
        data-brk-library="component__alert">
        <div className="d-flex justify-content-center align-items-center gap-2">
          <div className="d-flex justify-content-center align-items-center gap-1">
            <i className="start-icon far fa-times-circle faa-pulse animated"></i>
            <strong className="font__weight-semibold">
              {props.errorTitle}!{' '}
            </strong>
          </div>

          {props.message}
        </div>
      </div>
    </div>
  );
}

// The component that displays the heads up alert
export function HeadsUpAlert(props: IAlertProps) {
  return (
    <div className="col-sm-12">
      <div
        className="d-flex justify-content-between align-items-center alert fade alert-simple alert-info alert-dismissible text-left font__family-montserrat font__size-16 font__weight-light brk-library-rendered rendered show"
        role="alert"
        data-brk-library="component__alert">
        <div className="d-flex justify-content-center align-items-center gap-2">
          <div className="d-flex justify-content-center align-items-center gap-1">
            <i className="start-icon  fa fa-info-circle faa-shake animated"></i>
            <strong className="font__weight-semibold">
              {props.errorTitle}!
            </strong>
          </div>
          {props.message}
        </div>
      </div>
    </div>
  );
}

// The component that displays the appropriate alert based on the type
function Alert({ unmountAfter, message, id, errorType }: IParentAlertProps) {
  const { deleteError } = useErrorContext();

  // Delete alert after {n} seconds
  useEffect(() => {
    setTimeout(() => {
      deleteError(id);
    }, unmountAfter);
  }, [id, unmountAfter, deleteError]);

  // On 'x' button click delete the error immediately
  const onClose = () => {
    deleteError(id);
  };

  // Render alert based on type
  if (errorType === AlertTypeEnum.EXCEPTION) {
    return (
      <ExceptionAlert close={onClose} message={message} errorTitle={'Error'} />
    );
  }

  return <HeadsUpAlert close={onClose} message={message} errorTitle={'Info'} />;
}

export default Alert;
