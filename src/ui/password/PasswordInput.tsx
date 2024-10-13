import { forwardRef, InputHTMLAttributes, useEffect } from "react";
import ErrorList from "../../ErrorList";
import { useForm } from "../../FormProvider";
interface Validator {
  validator: (value: string) => boolean;
  error: string;
}
interface PasswordInputProps extends InputHTMLAttributes<HTMLInputElement> {
  minLength?: number;
  maxLength?: number;
  validators?: Validator[];
  id: string;
  matchWith?: string;
}
const PasswordInput = forwardRef<HTMLInputElement, PasswordInputProps>(
  ({ minLength, maxLength, matchWith, validators, id, ...props }, ref) => {
    const { formValues, handleChange, registerFeild, errors } = useForm();
    useEffect(() => {
      registerFeild(id, "");
    }, []);
    return (
      <div className="flex flex-col justify-start gap-1">
        <input
          className="p-1 rounded-md border border-slate-400"
          ref={ref}
          type="password"
          {...props}
          onChange={(e) => handleChange(id, e.target.value)}
          value={formValues[id] || ""}
        />
        <ErrorList errors={errors[id]} />
      </div>
    );
  }
);

export default PasswordInput;
