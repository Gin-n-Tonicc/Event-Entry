import { SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { CachePolicies, useFetch } from 'use-http';
import FormInput from '../../../components/form-input/FormInput';
import { authPaths } from '../../../config/api';
import { useAuthContext } from '../../../contexts/AuthContext';
import useUrlSearchParam from '../../../hooks/useURLSearchParam';
import useValidators from '../../../hooks/useValidator';
import { IAuthResponse, PageEnum } from '../../../types';

type Inputs = {
  Email: string;
  Password: string;
};

function Login() {
  const redirectTo = useUrlSearchParam('redirect');
  const { auth } = useValidators();
  const { loginUser } = useAuthContext();
  const navigate = useNavigate();

  const {
    handleSubmit,
    control,
    register,
    reset,
    watch,
    setError,
    clearErrors,
    setValue,
    formState: { errors },
  } = useForm<Inputs>({
    defaultValues: {
      Email: '',
      Password: '',
    },
    mode: 'onChange',
  });

  const { post, response, loading } = useFetch<IAuthResponse>(authPaths.login, {
    cache: CachePolicies.NO_CACHE,
  });

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const user = await post({
      email: data.Email.trim(),
      password: data.Password.trim(),
    });

    if (response.ok) {
      reset();
      loginUser(user);

      if (redirectTo) {
        navigate(redirectTo);
      } else {
        navigate(PageEnum.Home);
      }
    }
  };

  return (
    <div className="row">
      <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
        <div className="card border-0 shadow rounded-3 my-5">
          <div className="card-body p-4 p-sm-5">
            <h5 className="card-title text-center mb-5 fw-light fs-5">
              Log In
            </h5>
            <form onSubmit={handleSubmit(onSubmit)}>
              <FormInput
                control={control}
                type="email"
                name="Email"
                inputClasses="form-control"
                placeholder="name@example.com"
                labelText="Email Address*"
                rules={auth.EMAIL_VALIDATIONS}
              />

              <FormInput
                control={control}
                type="password"
                inputClasses="form-control"
                name="Password"
                placeholder="Password"
                labelText="Password*"
                rules={auth.PASSWORD_VALIDATIONS}
              />

              <div className="d-grid">
                <button
                  disabled={loading}
                  className="btn btn-primary btn-login text-uppercase fw-bold"
                  type="submit">
                  Log in
                </button>
              </div>
              <hr className="my-4" />
              <div className="d-grid mb-2">
                <button
                  disabled={loading}
                  className="btn btn-google btn-login text-uppercase fw-bold"
                  type="submit">
                  <i className="fab fa-google me-2" /> Log in with Google
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
