import { RegisterOptions } from 'react-hook-form';

const allowedFileMediaTypes = ['image/jpeg', 'image/png'];

// The hook that construct validation for common form fields
// with a message based on the user's selected language
export default function useCommonValidations() {
  const FILE_VALIDATIONS: RegisterOptions = {
    required: 'File is required',
    validate: (value: FileList) => {
      if (!allowedFileMediaTypes.includes(value[0].type)) {
        return 'Unsupported file type. Must be .png or .jpg/.jpeg';
      }

      return true;
    },
  };

  return { FILE_VALIDATIONS };
}
