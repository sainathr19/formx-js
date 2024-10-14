import { forwardRef, InputHTMLAttributes, useState } from "react";
import ErrorList from "../../ErrorList";
import { useField } from "../../useFeild";

interface Validator {
  validator: (value: string) => boolean;
  message: string;
}

interface PasswordInputProps extends InputHTMLAttributes<HTMLInputElement> {
  minLength?: number;
  maxLength?: number;
  validators?: Validator[];
  id: string;
  matchWith?: string;
  debounce?: number;
}

const PasswordInput = forwardRef<HTMLInputElement, PasswordInputProps>(
  (
    {
      minLength,
      maxLength,
      matchWith,
      validators,
      id,
      debounce,
      className,
      ...props
    },
    ref
  ) => {
    const [showPassword, setShowPassword] = useState(false);
    const { error, onChange } = useField(id, "", validators || [], debounce);

    return (
      <div className="flex flex-col justify-start gap-1">
        <div className="p-1 relative rounded-md border border-slate-400 overflow-hidden outline-none">
          <input
            className={`border-none outline-none pr-16 focus:ring-0 w-full ${className}`}
            ref={ref}
            type={showPassword ? "text" : "password"}
            {...props}
            onChange={onChange}
          />
          <button
            type="button"
            className="absolute right-2 top-1/2 transform -translate-y-1/2 text-sm text-slate-600"
            onClick={() => setShowPassword((prev) => !prev)}
          >
            {showPassword ? "Hide" : "Show"}
          </button>
        </div>
        <ErrorList errors={error} />
      </div>
    );
  }
);

export default PasswordInput;
