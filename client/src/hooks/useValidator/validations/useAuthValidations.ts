import { RegisterOptions } from 'react-hook-form';

// The hook that construct validation for auth form fields
// with a message based on the user's selected language
export default function useAuthValidations() {
  // Common validations
  const EMAIL_VALIDATIONS: RegisterOptions = {
    required: 'Email is required',
    pattern: {
      value: /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/gim,
      message: 'Email is not a valid email',
    },
  };

  const PASSWORD_VALIDATIONS: RegisterOptions = {
    required: 'Password is required',
    pattern: {
      value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/gim,
      message: 'Required minimum eight characters, one letter & one number',
    },
  };

  // Register validations
  const FIRST_NAME_VALIDATIONS: RegisterOptions = {
    required: 'First name is required',
  };

  const LAST_NAME_VALIDATIONS: RegisterOptions = {
    required: 'Last name is required',
  };

  const ADDRESS_VALIDATIONS: RegisterOptions = {
    required: 'Address is required',
    minLength: {
      value: 10,
      message: 'Address requires minimum ten characters',
    },
  };

  const EDUCATION_VALIDATIONS: RegisterOptions = {
    required: 'Education is required',
    minLength: {
      value: 10,
      message: 'Eudcation requires minimum ten characters',
    },
    maxLength: {
      value: 120,
      message: 'Education requires maximum of 120 characters',
    },
  };

  const EXPERIENCE_VALIDATIONS: RegisterOptions = {
    required: 'Experience is required',
    minLength: {
      value: 20,
      message: 'Experience requires minimum 20 characters',
    },
    maxLength: {
      value: 255,
      message: 'Experience requires maximum of 255 characters',
    },
  };

  // What I Can Help With
  const WICHW_VALIDATIONS: RegisterOptions = {
    required: 'Field is required',
    minLength: {
      value: 20,
      message: 'Requires minimum 20 characters',
    },
    maxLength: {
      value: 255,
      message: 'Requires maximum of 255 characters',
    },
  };

  const REPEAT_PASSWORD_VALIDATIONS: RegisterOptions = {
    ...PASSWORD_VALIDATIONS,
    required: 'Repeat password is required',
  };

  return {
    EMAIL_VALIDATIONS,
    PASSWORD_VALIDATIONS,
    FIRST_NAME_VALIDATIONS,
    LAST_NAME_VALIDATIONS,
    ADDRESS_VALIDATIONS,
    EDUCATION_VALIDATIONS,
    EXPERIENCE_VALIDATIONS,
    WICHW_VALIDATIONS,
    REPEAT_PASSWORD_VALIDATIONS,
  };
}
