import { useErrorContext } from '../../contexts/ErrorContext';
import Alert from '../alert/Alert';
import './AlertBox.scss';

function AlertBox() {
  const { errors } = useErrorContext();

  return (
    <section className="alert-container">
      <div className="container mt-5">
        <div className="row">
          {errors.map((x) => (
            <Alert {...x} key={x.id} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default AlertBox;
