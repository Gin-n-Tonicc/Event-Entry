import { useCallback } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { MultiValue } from 'react-select';
import FormInput from '../../../components/form-input/FormInput';
import './Register.scss';
import RegisterSkillsSelect, {
  SkillOption,
} from './register-skills-select/RegisterSkillsSelect';

type Inputs = {
  'First Name': string;
  'Last Name': string;
  'Current Workplace': string;
  Education: string;
  Experience: string;
  Address: string;
  Email: string;
  Password: string;
  'Repeat Password': string;
  skillsHave: MultiValue<SkillOption>;
  skillsNeed: MultiValue<SkillOption>;
};

function Register() {
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
      'First Name': '',
      'Last Name': '',
      'Current Workplace': '',
      Education: '',
      Experience: '',
      Address: '',
      Email: '',
      Password: '',
      'Repeat Password': '',
      skillsHave: [],
      skillsNeed: [],
    },
    mode: 'onChange',
  });

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    console.log(data);
  };

  const mockedSkills = [...new Array(5)].map((x, i) => ({
    value: i.toString(),
    label: 'Software Engineering' + i * 32,
  }));

  const onSkillsHaveChange = useCallback(
    (val: MultiValue<SkillOption>) => {
      setValue('skillsHave', val, {
        shouldValidate: true,
        shouldDirty: true,
        shouldTouch: true,
      });
    },
    [setValue]
  );

  const onSkillsNeedChange = useCallback(
    (val: MultiValue<SkillOption>) => {
      setValue('skillsNeed', val, {
        shouldValidate: true,
        shouldDirty: true,
        shouldTouch: true,
      });
    },
    [setValue]
  );

  return (
    <div className="row">
      <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
        <div className="card border-0 shadow rounded-3 my-5">
          <div className="card-body p-4 p-sm-5">
            <h5 className="card-title text-center mb-5 fw-light fs-5">
              Sign In
            </h5>
            <form onSubmit={handleSubmit(onSubmit)}>
              <FormInput
                control={control}
                type="email"
                name="Email"
                inputClasses="form-control"
                placeholder="name@example.com"
                labelText="Email Address*"
              />

              <FormInput
                control={control}
                type="text"
                inputClasses="form-control"
                name="First Name"
                placeholder="John"
                labelText="First Name*"
              />

              <FormInput
                control={control}
                type="text"
                inputClasses="form-control"
                name="Last Name"
                placeholder="Johnson"
                labelText="Last Name*"
              />

              <FormInput
                control={control}
                type="text"
                inputClasses="form-control"
                name="Current Workplace"
                placeholder="LudogorieSoft, Targovishte 7700, Bulgaria"
                labelText="Workplace"
              />

              <FormInput
                control={control}
                type="text"
                inputClasses="form-control"
                name="Education"
                placeholder="1 SU 'st. Sedmochislenici'"
                labelText="Education*"
              />

              <FormInput
                control={control}
                type="password"
                inputClasses="form-control"
                name="Password"
                placeholder="Password"
                labelText="Password*"
              />

              <FormInput
                control={control}
                type="password"
                inputClasses="form-control"
                name="Repeat Password"
                placeholder="Repeat Password"
                labelText="Repeat Password*"
              />

              <div className="form-floating mb-3">
                <textarea
                  className="form-control"
                  placeholder="Leave a comment here"
                  id="floatingTextarea2"
                  style={{ height: '100px' }}
                  {...register('Experience')}></textarea>
                <label htmlFor="floatingTextarea2">Experience</label>
              </div>

              <RegisterSkillsSelect
                options={mockedSkills}
                placeholder={'Select what skills you HAVE...'}
                onChange={onSkillsHaveChange}
              />
              <RegisterSkillsSelect
                options={mockedSkills}
                placeholder={'Select what skills you NEED...'}
                onChange={onSkillsNeedChange}
              />

              <div className="d-grid">
                <button
                  className="btn btn-primary btn-login text-uppercase fw-bold"
                  type="submit">
                  Sign in
                </button>
              </div>
              <hr className="my-4" />
              <div className="d-grid mb-2">
                <button
                  className="btn btn-google btn-login text-uppercase fw-bold"
                  type="submit">
                  <i className="fab fa-google me-2" /> Sign in with Google
                </button>
              </div>
              <div className="d-grid">
                <button
                  className="btn btn-facebook btn-login text-uppercase fw-bold"
                  type="submit">
                  <i className="fab fa-facebook-f me-2" /> Sign in with Facebook
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
