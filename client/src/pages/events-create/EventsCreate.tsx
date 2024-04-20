import { useCallback } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { MultiValue } from 'react-select';
import { CachePolicies, useFetch } from 'use-http';
import FormErrorWrapper from '../../components/form-error-wrapper/FormErrorWrapper';
import FormInput from '../../components/form-input/FormInput';
import SkillsSelect, {
  SkillOption,
} from '../../components/skills-select/SkillsSelect';
import { eventsPaths, filesPaths, skillsPaths } from '../../config/api';
import useValidators from '../../hooks/useValidator';
import { IFile, ISkill, PageEnum } from '../../types';
import { IEvent } from '../../types/interfaces/events/IEvent';

type Inputs = {
  Name: string;
  Description: string;
  Address: string;
  'Start Time': string;
  'End Time': string;
  picture: File[];
  skills: MultiValue<SkillOption>;
};

function EventsCreate() {
  const { event, common } = useValidators();
  const navigate = useNavigate();

  const {
    handleSubmit,
    control,
    register,
    setValue,
    reset,
    formState: { errors },
  } = useForm<Inputs>({
    defaultValues: {
      Name: '',
      Description: '',
      Address: '',
      'Start Time': '',
      'End Time': '',
      picture: [],
      skills: [],
    },
    mode: 'onChange',
  });

  const { post: filePost, response: postFileRes } = useFetch<IFile>(
    filesPaths.upload()
  );

  const { post: eventPost, response: postEventRes } = useFetch<IEvent>(
    eventsPaths.create
  );

  const { data: skills, loading: loadingSkills } = useFetch<ISkill[]>(
    skillsPaths.getAll,
    {
      cachePolicy: CachePolicies.CACHE_AND_NETWORK,
    },
    []
  );

  const onSkillsChange = useCallback(
    (val: MultiValue<SkillOption>) => {
      setValue('skills', val, {
        shouldValidate: true,
        shouldDirty: true,
        shouldTouch: true,
      });
    },
    [setValue]
  );

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const fileFormData = new FormData();
    fileFormData.append('file', data.picture[0]);
    const file = await filePost(fileFormData);

    if (!postFileRes.ok) {
      return;
    }

    const body = {
      name: data.Name,
      description: data.Description,
      address: data.Address,
      startTime: new Date(data['Start Time']),
      endTime: new Date(data['End Time']),
      picture: file,
      skills: data.skills.map((x) =>
        skills?.find((y) => y.id === Number(x.value))
      ),
    };

    const event = await eventPost(body);
    if (postEventRes.ok) {
      reset();
      navigate(PageEnum.EventsSingle.replace(':id', event.id.toString()));
    }
  };

  const skillsAsSelectOptions =
    skills?.map((x) => ({
      value: x.id.toString(),
      label: x.name,
    })) || [];

  return (
    <div className="row">
      <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
        <div className="card border-0 shadow rounded-3 my-5">
          <div className="card-body p-4 p-sm-5">
            <h5 className="card-title text-center mb-5 fw-light fs-5">
              Create Event
            </h5>
            <form onSubmit={handleSubmit(onSubmit)}>
              <FormInput
                control={control}
                name="Name"
                inputClasses="form-control"
                placeholder="Name"
                labelText="Name"
                type="text"
                rules={event.NAME_VALIDATIONS}
              />

              <FormErrorWrapper message={errors.Description?.message}>
                <div className="form-floating">
                  <textarea
                    className="form-control"
                    placeholder="Leave a comment here"
                    id="floatingTextarea2"
                    style={{ height: '200px' }}
                    {...register('Description', {
                      ...event.DESCRIPTION_VALIDATIONS,
                    })}></textarea>
                  <label htmlFor="floatingTextarea2">Description</label>
                </div>
              </FormErrorWrapper>

              <FormInput
                control={control}
                name="Address"
                inputClasses="form-control"
                placeholder="Address"
                labelText="Address"
                type="text"
                rules={event.ADDRESS_VALIDATIONS}
              />

              <FormInput
                control={control}
                name="Start Time"
                inputClasses="form-control"
                placeholder="Start Time"
                labelText="Start Time"
                type="datetime-local"
                rules={event.START_TIME_VALIDATIONS}
              />

              <FormInput
                control={control}
                name="End Time"
                inputClasses="form-control"
                placeholder="End Time"
                labelText="End Time"
                type="datetime-local"
                rules={event.END_TIME_VALIDATIONS}
              />

              <FormErrorWrapper message={errors.picture?.message}>
                <div>
                  <label htmlFor="formFile" className="form-label">
                    Event Image
                  </label>
                  <input
                    {...register('picture', { ...common.FILE_VALIDATIONS })}
                    className="form-control"
                    type="file"
                    id="formFile"
                  />
                </div>
              </FormErrorWrapper>

              <FormErrorWrapper message={undefined}>
                <SkillsSelect
                  options={skillsAsSelectOptions}
                  placeholder={'Select what skills you have/need...'}
                  onChange={onSkillsChange}
                />
              </FormErrorWrapper>

              <div className="d-grid">
                <button
                  className="btn btn-primary btn-login text-uppercase fw-bold"
                  type="submit">
                  Create
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EventsCreate;
