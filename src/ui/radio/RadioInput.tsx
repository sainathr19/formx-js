import { forwardRef, InputHTMLAttributes } from "react";
import ErrorList from "../../ErrorList";
import { useField } from "../../useFeild";

interface Validator {
  validator: (value: string) => boolean;
  message: string;
}

interface RadioInputProps extends InputHTMLAttributes<HTMLInputElement> {
  validators?: Validator[];
  required?: boolean;
  label?: string;
  id: string;
  options: { value: string; label: string }[];
}

const RadioInput = forwardRef<HTMLInputElement, RadioInputProps>(
  ({ label, id, validators, required, options, className, ...props }, ref) => {
    const { error, onChange } = useField(id, "", validators);

    return (
      <div className="flex flex-col justify-start gap-1">
        {label && <label className="w-max">{label}</label>}
        <div className="flex flex-col gap-2">
          {options.map((option) => (
            <label key={option.value} className="flex items-center gap-2">
              <input
                className={`p-1 border-slate-400 ${className}`}
                type="radio"
                name={id}
                value={option.value}
                ref={ref}
                {...props}
                onChange={onChange}
              />
              {option.label}
            </label>
          ))}
        </div>
        <ErrorList errors={error} />
      </div>
    );
  }
);

export default RadioInput;
