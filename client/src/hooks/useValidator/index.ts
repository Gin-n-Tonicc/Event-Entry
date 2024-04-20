import useAuthValidations from './validations/useAuthValidations';

// The hook that groups all of the other validation error hooks into one
export default function useValidators() {
  const authValidations = useAuthValidations();

  return {
    auth: authValidations,
  };
}
