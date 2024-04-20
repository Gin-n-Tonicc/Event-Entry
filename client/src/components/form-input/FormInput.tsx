import { FocusEventHandler } from 'react';
import { UseControllerProps, useController } from 'react-hook-form';
import FormErrorWrapper from '../form-error-wrapper/FormErrorWrapper';

export type FormInputProps = {
  type: string;
  labelText?: string;
  inputClasses?: string;
  placeholder?: string;
  onFocus?: FocusEventHandler<HTMLInputElement>;
} & UseControllerProps<any>;

// Custom form input attached to the controller (form)
export default function FormInput(props: FormInputProps) {
  const { field, fieldState } = useController(props);

  return (
    <FormErrorWrapper message={fieldState.error?.message}>
      <div className="form-floating mb-3">
        <input
          {...field}
          className={props.inputClasses}
          type={props.type}
          placeholder={props.placeholder || props.name}
          onFocus={props.onFocus}
        />
        <label htmlFor={props.name}>{props.labelText}</label>
      </div>
    </FormErrorWrapper>
  );
}
