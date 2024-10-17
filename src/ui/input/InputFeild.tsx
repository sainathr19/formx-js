import { forwardRef, HTMLInputTypeAttribute, InputHTMLAttributes } from "react";
import { useField } from "../../useFeild";
import ErrorList from "../../utils/ErrorList";
interface Validator {
  validator: (value: string) => Promise<boolean> | boolean;
  message: string;
}
interface InputFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  id: string;
  type: HTMLInputTypeAttribute;
  initialValue?: any;
  required?: boolean;
  validators?: Validator[];
  debounce?: number;
}
const InputField = forwardRef<HTMLInputElement, InputFieldProps>(
  (
    {
      id,
      type,
      initialValue = "",
      required,
      validators,
      debounce,
      className,
      ...props
    },
    ref
  ) => {
    const { error, onChange } = useField(
      id,
      initialValue,
      validators,
      debounce
    );
    return (
      <div className="flex flex-col justify-start gap-1">
        <input
          className={`p-1 border rounded-md border-slate-400 ${className}`}
          ref={ref}
          type={type}
          {...props}
          onChange={onChange}
        />
        <ErrorList errors={error} />
      </div>
    );
  }
);

export default InputField;
