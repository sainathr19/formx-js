import { ChangeEvent, forwardRef, InputHTMLAttributes, useEffect } from "react";
import ErrorList from "../../ErrorList";
import { useForm } from "../../FormProvider";
import { useDebounce } from "../../utils/debounce";
interface Validator {
  validator: (value: string) => boolean;
  message: string;
}
interface TextInputProps extends InputHTMLAttributes<HTMLInputElement> {
  validators?: Validator[];
  required?: boolean;
  label?: string;
  id: string;
  debounce?: number;
}
const TextInput = forwardRef<HTMLInputElement, TextInputProps>(
  ({ label, id, validators, required, debounce, className, ...props }, ref) => {
    const { formValues, registerFeild, handleChange, errors } = useForm();
    useEffect(() => {
      registerFeild(id, "");
    }, []);
    const debouncedHandleChange = useDebounce(
      (e: ChangeEvent<HTMLInputElement>) =>
        handleChange(id, e.target.value, validators),
      debounce || 300
    );
    return (
      <div className="flex flex-col justify-start gap-1">
        {label && <label className="w-max">{label}</label>}
        <input
          className={`p-1 border-2 rounded-md border-slate-400 ${className}`}
          type="text"
          ref={ref}
          {...props}
          onChange={debouncedHandleChange}
        />
        <ErrorList errors={errors[id]} />
      </div>
    );
  }
);

export default TextInput;
