import { useCallback } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { MultiValue } from 'react-select';
import { CachePolicies, useFetch } from 'use-http';
import FormErrorWrapper from '../../../components/form-error-wrapper/FormErrorWrapper';
import FormInput from '../../../components/form-input/FormInput';
import SkillsSelect, {
  SkillOption,
} from '../../../components/skills-select/SkillsSelect';
import { OAuthPaths, skillsPaths } from '../../../config/api';
import { useAuthContext } from '../../../contexts/AuthContext';
import { useErrorContext } from '../../../contexts/ErrorContext';
import useValidators from '../../../hooks/useValidator';
import { IAuthResponse, ISkill, PageEnum, RoleEnum } from '../../../types';
import '../styles/Register.scss';

type Inputs = {
  'First Name': string;
  'Last Name': string;
  'Current Workplace': string;
  Education: string;
  Experience: string;
  Address: string;
  WICHW: string;
  skillsHave: MultiValue<SkillOption>;
  skillsNeed: MultiValue<SkillOption>;
  role: RoleEnum;
};

function FinishRegister() {
  const navigate = useNavigate();
  const { user, loginUser } = useAuthContext();
  const { auth } = useValidators();
  const { addError } = useErrorContext();

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
      'First Name': user.firstname || '',
      'Last Name': '',
      'Current Workplace': '',
      Education: '',
      Experience: '',
      Address: '',
      WICHW: '',
      skillsHave: [],
      skillsNeed: [],
      role: RoleEnum.USER,
    },
    mode: 'onChange',
  });

  const formValues = watch();

  const { data: skills } = useFetch<ISkill[]>(
    skillsPaths.getAll,
    {
      cachePolicy: CachePolicies.CACHE_AND_NETWORK,
    },
    []
  );

  const { put, response, loading } = useFetch<IAuthResponse>(
    OAuthPaths.completeOAuth
  );

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const body = {
      firstname: data['First Name'].trim(),
      lastname: data['Last Name'].trim(),
      currentWorkPlace: data['Current Workplace'].trim(),
      education: data.Education.trim(),
      workExperience: data.Experience.trim(),
      address: data.Address.trim(),
      whatCanHelpWith: data.WICHW.trim(),
      skills: data.skillsHave.map((x) =>
        skills?.find((y) => y.id === Number(x.value))
      ),
      lookingForSkills: data.skillsNeed.map((x) =>
        skills?.find((y) => y.id === Number(x.value))
      ),
      role: data.role,
    };

    const res = await put(body);

    if (response.ok) {
      reset();
      loginUser(res);
      navigate(PageEnum.Home);
    }
  };

  const skillsAsSelectOptions =
    skills?.map((x) => ({
      value: x.id.toString(),
      label: x.name,
    })) || [];

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
              Finish Register
            </h5>
            <form onSubmit={handleSubmit(onSubmit)}>
              <FormInput
                control={control}
                type="text"
                inputClasses="form-control"
                name="First Name"
                placeholder="John"
                labelText="First Name*"
                rules={auth.FIRST_NAME_VALIDATIONS}
              />

              <FormInput
                control={control}
                type="text"
                inputClasses="form-control"
                name="Last Name"
                placeholder="Johnson"
                labelText="Last Name*"
                rules={auth.LAST_NAME_VALIDATIONS}
              />

              <FormInput
                control={control}
                type="text"
                inputClasses="form-control"
                name="Address"
                placeholder="LudogorieSoft, Targovishte 7700, Bulgaria"
                labelText="Address*"
                rules={auth.ADDRESS_VALIDATIONS}
              />

              <FormInput
                control={control}
                type="text"
                inputClasses="form-control"
                name="Education"
                placeholder="1 SU 'st. Sedmochislenici'"
                labelText="Education*"
                rules={auth.EDUCATION_VALIDATIONS}
              />

              <FormErrorWrapper message={errors.Experience?.message}>
                <div className="form-floating">
                  <textarea
                    className="form-control"
                    placeholder="Leave a comment here"
                    id="floatingTextarea2"
                    style={{ height: '100px' }}
                    {...register('Experience', {
                      ...auth.EXPERIENCE_VALIDATIONS,
                    })}></textarea>
                  <label htmlFor="floatingTextarea2">Experience*</label>
                </div>
              </FormErrorWrapper>

              <FormErrorWrapper message={errors.WICHW?.message}>
                <div className="form-floating">
                  <textarea
                    className="form-control"
                    placeholder="Leave a comment here"
                    id="floatingTextarea2"
                    style={{ height: '100px' }}
                    {...register('WICHW', {
                      ...auth.WICHW_VALIDATIONS,
                    })}></textarea>
                  <label htmlFor="floatingTextarea2">
                    What I can help with*
                  </label>
                </div>
              </FormErrorWrapper>

              <FormInput
                control={control}
                type="text"
                inputClasses="form-control"
                name="Current Workplace"
                placeholder="LudogorieSoft, Targovishte 7700, Bulgaria"
                labelText="Workplace"
              />

              <FormErrorWrapper message={undefined}>
                <SkillsSelect
                  options={skillsAsSelectOptions}
                  placeholder={'Select what skills you HAVE...'}
                  onChange={onSkillsHaveChange}
                />
              </FormErrorWrapper>
              <FormErrorWrapper message={undefined}>
                <SkillsSelect
                  options={skillsAsSelectOptions}
                  placeholder={'Select what skills you NEED...'}
                  onChange={onSkillsNeedChange}
                />
              </FormErrorWrapper>

              <FormErrorWrapper message={undefined}>
                <div className="d-flex justify-content-between align-items-center">
                  <div className="d-flex justify-content-center align-items-center gap-2">
                    <input
                      {...register('role')}
                      type="radio"
                      className="form-check-input m-0"
                      value={RoleEnum.USER}
                    />
                    <p className="m-0">User</p>
                  </div>
                  <div className="d-flex justify-content-center align-items-center gap-2">
                    <p className="m-0">Organisation</p>
                    <input
                      {...register('role')}
                      type="radio"
                      className="form-check-input m-0"
                      value={RoleEnum.ORGANISATION}
                    />
                  </div>
                </div>
              </FormErrorWrapper>

              <div className="d-grid">
                <button
                  disabled={loading}
                  className="btn btn-primary btn-login text-uppercase fw-bold"
                  type="submit">
                  Finish Register
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FinishRegister;
