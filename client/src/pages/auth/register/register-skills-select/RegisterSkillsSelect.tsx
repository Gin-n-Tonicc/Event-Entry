import Select, { MultiValue } from 'react-select';

export interface SkillOption {
  readonly value: string;
  readonly label: string;
}

interface RegisterSkillsSelectProps {
  options: SkillOption[];
  placeholder: string;
  onChange: (v: MultiValue<SkillOption>) => void;
}

function RegisterSkillsSelect(props: RegisterSkillsSelectProps) {
  return (
    <div className="form-floating">
      <Select
        placeholder={props.placeholder}
        options={props.options}
        isMulti={true}
        name="colors"
        className="basic-multi-select"
        classNamePrefix="select"
        onChange={(newValue) => {
          props.onChange(newValue);
        }}
      />
    </div>
  );
}

export default RegisterSkillsSelect;
