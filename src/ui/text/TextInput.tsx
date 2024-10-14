import { forwardRef, InputHTMLAttributes } from "react";
import ErrorList from "../../ErrorList";
import { useField } from "../../useFeild";
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
    const { error, onChange } = useField(id, "", validators, debounce);
    return (
      <div className="flex flex-col justify-start gap-1">
        {label && <label className="w-max">{label}</label>}
        <input
          className={`p-1 border rounded-md border-slate-400 ${className}`}
          type="text"
          ref={ref}
          {...props}
          onChange={onChange}
        />
        <ErrorList errors={error} />
      </div>
    );
  }
);

export default TextInput;
