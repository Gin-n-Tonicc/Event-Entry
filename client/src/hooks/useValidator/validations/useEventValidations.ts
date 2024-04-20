import { RegisterOptions } from 'react-hook-form';

export default function useEventValidations() {
  const NAME_VALIDATIONS: RegisterOptions = {
    required: 'Name is required',
    minLength: {
      value: 10,
      message: 'Name requires minimum 10 characters',
    },
    maxLength: {
      value: 255,
      message: 'Name requires maximum of 255 characters',
    },
  };

  const ADDRESS_VALIDATIONS: RegisterOptions = {
    required: 'Address is required',
    minLength: {
      value: 10,
      message: 'Address requires minimum 10 characters',
    },
    maxLength: {
      value: 255,
      message: 'Address requires maximum of 255 characters',
    },
  };

  const DESCRIPTION_VALIDATIONS: RegisterOptions = {
    required: 'Description is required',
    minLength: {
      value: 150,
      message: 'Description requires minimum 150 characters',
    },
    maxLength: {
      value: 255,
      message: 'Description requires maximum of 255 characters',
    },
  };

  const START_TIME_VALIDATIONS: RegisterOptions = {
    required: 'Start Time is required',
  };

  const END_TIME_VALIDATIONS: RegisterOptions = {
    required: 'End Time is required',
  };

  return {
    NAME_VALIDATIONS,
    ADDRESS_VALIDATIONS,
    DESCRIPTION_VALIDATIONS,
    START_TIME_VALIDATIONS,
    END_TIME_VALIDATIONS,
  };
}
