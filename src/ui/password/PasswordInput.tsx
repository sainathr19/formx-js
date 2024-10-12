import { forwardRef, InputHTMLAttributes, useEffect } from "react";
import { useForm } from "../../FormProvider";
interface Validator {
  validator: (value: string) => boolean;
  error: string;
}
interface PasswordInputProps extends InputHTMLAttributes<HTMLInputElement> {
  minLength?: number;
  maxLength?: number;
  validators?: Validator[];
  name: string;
  label?: string;
  id: string;
  matchWith?: string;
}
const PasswordInput = forwardRef<HTMLInputElement, PasswordInputProps>(
  (
    { minLength, maxLength, matchWith, validators, id, label, name, ...props },
    ref
  ) => {
    const { formValues, handleChange, registerFeild } = useForm();
    useEffect(() => {
      registerFeild(id, "");
    }, []);
    return (
      <div className="flex flex-col justify-start gap-1">
        {label && (
          <label className="w-max" htmlFor={name}>
            {label}
          </label>
        )}
        <input
          className="p-1 rounded-md border border-slate-400"
          ref={ref}
          type="password"
          {...props}
          onChange={(e) => handleChange(name, e.target.value)}
          value={formValues[name] || ""}
        />
      </div>
    );
  }
);

export default PasswordInput;
