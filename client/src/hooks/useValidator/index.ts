import useAuthValidations from './validations/useAuthValidations';
import useCommonValidations from './validations/useCommonValidations';
import useEventValidations from './validations/useEventValidations';

// The hook that groups all of the other validation error hooks into one
export default function useValidators() {
  const authValidations = useAuthValidations();
  const eventValidations = useEventValidations();
  const commonValidations = useCommonValidations();

  return {
    auth: authValidations,
    event: eventValidations,
    common: commonValidations,
  };
}
